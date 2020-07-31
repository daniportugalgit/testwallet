import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import Web3Context from '../../contexts/web3Context';

export default function Balance() {
  const { balance, updateBalance } = useContext(Web3Context);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saldo:</Text>
      <Text style={styles.balance}>{balance}</Text>
      <View style={styles.button}>
        <TouchableOpacity onPress={updateBalance}>
          <Feather name='refresh-ccw' size={20} color='orange' />
        </TouchableOpacity>
      </View>
    </View>
  );
}