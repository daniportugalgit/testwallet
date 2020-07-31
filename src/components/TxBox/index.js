import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';

import styles from './styles';

import Truncator from '../../utils/Truncator';
import TxViewer from '../../utils/TxViewer';

export default function TxBox({ txHash, status, errorMsg='Ocorreu um erro!' }) {
  const truncatedHash = Truncator.tx(txHash, 42);

  let title = '';
  let description = '';
  let borderColor = '';

  switch (status) {
    case 'waiting':
      title = 'Transação Enviada';
      description = 'Sua transação foi enviada para a blockchain e será minerada em breve. Por favor, aguarde...';
      borderColor = 'orange';
      break;
  
    case 'success':
      title = 'Transação Finalizada';
      description = 'Sua transação foi minerada com sucesso!';
      borderColor = 'green';
      break;

    case 'error':
      title = 'ERRO';
      description = errorMsg;
      borderColor = 'red';
      break;

    default:
      title = 'Transação Enviada';
      description = 'Sua transação foi enviada para a blockchain e será minerada em breve. Por favor, aguarde...';
      borderColor = 'orange';
      break;
  }

  function openEtherscan() {
    TxViewer.open(txHash);
  }

  return (
    <View style={[styles.container, {borderColor:borderColor}]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={openEtherscan}>
        <Text style={styles.txHash}>{truncatedHash}</Text>
      </TouchableOpacity>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}