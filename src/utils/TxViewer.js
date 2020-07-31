import { Linking } from 'react-native';

class TxViewer {
  static etherscanURL = 'https://ropsten.etherscan.io/tx/';

  static open(txHash) {
    Linking.openURL(`${this.etherscanURL}${txHash}`);
  }
}

export default TxViewer;