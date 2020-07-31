import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import styles from './styles';

import Truncator from '../../utils/Truncator';
import TxViewer from '../../utils/TxViewer';

export default function HistoryItem({ txHash, to, value }) {
  const truncatedHash = Truncator.tx(txHash, 36);
  const truncatedRecipient = Truncator.tx(to, 36);


  function openEtherscan() {
    TxViewer.open(txHash);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openEtherscan}>
        <Text style={styles.txHash}>Tx: {truncatedHash}</Text>
        <Text style={styles.to}>To: {truncatedRecipient}</Text>
        <Text style={styles.value}>Value: {value}</Text>
      </TouchableOpacity>
    </View>
  );
}