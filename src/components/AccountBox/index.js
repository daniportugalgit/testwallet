import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import ActionButton from '../../components/ActionButton';
import Web3Context from '../../contexts/web3Context';

export default function AccountBox({ address }) {
  const { resetUserAccount } = useContext(Web3Context);

  const navigation = useNavigation();
  
  function navigateToTransfer() {
    navigation.navigate('Transferir');
  }

  function navigateToHistory() {
    navigation.navigate('Histórico');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logado com a conta</Text>
      <Text style={styles.address} selectable={true}>{address}</Text>
      <ActionButton icon="dollar-sign" onPress={navigateToTransfer}>Transferir</ActionButton>
      <ActionButton icon="clock" onPress={navigateToHistory}>Histórico</ActionButton>
      <ActionButton icon="slash" onPress={resetUserAccount}>Remover Conta</ActionButton>
    </View>
  );
}