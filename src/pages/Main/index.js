//TODO: Botão de Transfer fica desabilitado enquanto executa a transação?

import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import AccountBox from '../../components/AccountBox';
import Balance from '../../components/Balance';

import Web3Context from '../../contexts/web3Context';

export default function Main() {
  const { ready, isCreatingAccount, wallet, createNewWallet, hasAccount } = useContext(Web3Context);
  const [pass, setPass] = useState('');
  
  function startEncrypting() {
    createNewWallet(pass);
  }

  if(!ready) {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Carregando, por favor aguarde...</Text>
      </View>
    )
  } else {
    if(!hasAccount()) {
      if(isCreatingAccount) {
        return (
          <View style={styles.container}>
            <Text style={styles.mainText}>Criando e encriptando sua conta... Isto pode levar alguns segundos.</Text>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <Text style={styles.mainText}>Você ainda não possui uma conta.</Text>
            <View>
              <TextInput 
                style={styles.input}
                placeholder="Senha"
                onChangeText={text => setPass(text)}
              ></TextInput>
              <TouchableOpacity style={styles.action}>
                <Feather name="user-plus" size={28} color="#FFF" />
                <Text style={styles.actionText} onPress={startEncrypting}>Nova conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    } else {
      return (
        <View>
          <Balance/>
          <View style={styles.container}>  
            <AccountBox address={wallet.address} />
          </View>
        </View>
      )
    } 
  }
}