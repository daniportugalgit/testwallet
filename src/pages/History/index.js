import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';

import HistoryItem from '../../components/HistoryItem';

import Web3Context from '../../contexts/web3Context';

export default function History() {
  const { history } = useContext(Web3Context);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Toque em uma transação para ver seus detalhes</Text>
      <FlatList
        data={history}
        style={styles.txList}
        keyExtractor={tx => tx.txHash}
        renderItem={({ item: tx}) => (
          <HistoryItem txHash={tx.txHash} to={tx.to} value={tx.value}/>
        )}
      />
      
    </View>
  )
}