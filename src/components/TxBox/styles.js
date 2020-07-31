import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'orange',
    margin: 20,
    marginTop: 0
  },

  title: {
    fontSize: 16,
    color: '#222',
    padding: 8,
    paddingBottom: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  txHash: {
    fontSize: 14,
    color: 'blue',
    padding: 8,
    paddingBottom: 0,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: '#222',
    padding: 8,
    textAlign: 'center'
  }
})