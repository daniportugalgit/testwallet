import React, { useState, useContext } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';

import ActionButton from '../../components/ActionButton';
import Balance from '../../components/Balance';
import TxBox from '../../components/TxBox';

import Web3Context from '../../contexts/web3Context';

export default function Transfer() {
  const { ethers, wallet, updateBalance, addToHistory, txFlow, setTxFlow } = useContext(Web3Context);
  const [to, setTo] = useState('');
  const [tokens, setTokens] = useState(0);

  async function send() {
    if(to == '') return; //aqui viria uma validação mais robusta
    if(tokens == 0) return; //aqui viria uma validação mais robusta
    
    let parsedTokens = ethers.utils.parseEther(tokens);

    const tx = await wallet.sendTransaction({
      to: to,
      value: parsedTokens
    }).then(function(receipt){
      setTxFlow({ status: 'waiting', txHash: receipt.hash });
      wallet.provider.waitForTransaction(receipt.hash).then(
        function(result) {
          if(result.status == 1) {
            setTxFlow({ status: 'success', txHash: result.transactionHash });
            addToHistory({txHash:result.transactionHash, to: to, value:tokens});
            updateBalance();
          } else {
            //Aconteceu um erro ao processar a TX na blockchain; podemos ou não ter um txHash aqui:
            setTxFlow({ status: 'error', txHash: result.transactionHash, errorMsg: error.body.error.message });
          }
        }
      )
    }).catch((error) => {
      //Aconteceu um erro ao enviar a Tx (antes de processar); não teremos um txHash aqui:
      setTxFlow({ status: 'error', txHash: '', errorMsg: error.body.error.message });
    });
  }

  return (
    <View>
      <Balance/>
      
      <View style={styles.container}>
        <Text style={styles.title}>Para quem você deseja enviar Ether?</Text>
        <TextInput 
          style={styles.input}
          placeholder="0x16B4Cc06F2e46D78a003D7e7F489BE944b541C48"
          onChangeText={text => setTo(text)}
        ></TextInput>

        <Text style={styles.title}>Quanto você deseja enviar?</Text>
        <TextInput
          style={styles.input}
          placeholder="0.0001"
          onChangeText={text => setTokens(text)}
        ></TextInput>
        
        <ActionButton icon="check" onPress={send}>Transferir</ActionButton>
      </View>

      { 
        txFlow.status != 'clean' ?
        <TxBox txHash={txFlow.txHash} status={txFlow.status} errorMsg={txFlow.errorMsg} />
        : null
      }
    </View>
  )
}