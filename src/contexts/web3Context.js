import React, { createContext, useState, useEffect } from 'react';
import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';
import { YellowBox } from 'react-native';
import { ethers } from 'ethers';
YellowBox.ignoreWarnings(['Setting a timer']); //suppress long timer warning

import { INFURA_KEY, APP_SECRET } from '@env';

import { providers } from "ethers";
const provider = new providers.InfuraProvider(
  "ropsten",
  INFURA_KEY
);

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState({ address: '0x0'});
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState([]);
  const [txFlow, setTxFlow] = useState({ status: 'clean', txHash:'', errorMsg:'Ops, ocorreu um erro!' }); //status: clean, waiting, success, error 

  useEffect(() => {
    setLocalAccount();
    //resetUserAccount(); //helper to test app;
  }, []);

  useEffect(() => {
    onUserLoggedIn();
  }, [wallet]);

  async function updateBalance() {
    if(!wallet) return;

    let accBalance = await provider.getBalance(wallet.address);
    setBalance(ethers.utils.formatEther(accBalance));
  }

  async function createNewWallet(password = 'password123') {
    setIsCreatingAccount(true);
    await SecureStore.setItemAsync(APP_SECRET, password);
        
    const randomBytes = await Random.getRandomBytesAsync(16);
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    const newWallet = ethers.Wallet.fromMnemonic(mnemonic);
    const walletConnected = newWallet.connect(provider);
    
    await SecureStore.setItemAsync(password, mnemonic);
  
    setWallet(walletConnected);
    setIsCreatingAccount(false);
  }

  async function getUserLocalPass() {
    let userPassword = await SecureStore.getItemAsync(APP_SECRET);
    return userPassword;
  }

  async function setLocalAccount() {
    let userPassword = await getUserLocalPass();
    if(userPassword == '') return;
    
    if(hasAccount()) return;

    try {
      const decryptedMnemonics = await SecureStore.getItemAsync(userPassword);
      const newWallet = ethers.Wallet.fromMnemonic(decryptedMnemonics);
      const walletConnected = newWallet.connect(provider);
      
      setWallet(walletConnected);
    } catch(e) { console.log("local wallet not found") };

    setReady(true);
  }

  async function resetUserAccount() {
    let userPassword = await getUserLocalPass();
    if(userPassword == '') return;

    await SecureStore.deleteItemAsync(userPassword);

    setWallet({ address: '0x0' });
  }

  function hasAccount() {
    if(!wallet) return false;
    if(wallet.address == '0x0') return false;
    return true;
  }

  function onUserLoggedIn() {
    if(!hasAccount()) return;

    updateBalance();
  }

  function addToHistory(tx) {
    setHistory([...history, tx]);
  }

  function fetchHistory() {
    //TODO: loads events history from ERC-20 tokens; won't work with Ether
  }

  return (
    <Web3Context.Provider value={{ ready, isCreatingAccount, balance, updateBalance, wallet, hasAccount, createNewWallet, history, ethers, addToHistory, txFlow, setTxFlow, resetUserAccount }}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3Context;