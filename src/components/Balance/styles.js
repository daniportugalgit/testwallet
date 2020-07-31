import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    flexDirection: 'row',
  },

  title: {
    paddingRight: 4,
    fontSize: 16,
    color: '#222'
  },

  balance: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold'
  },

  button: {
    flexDirection: 'row',
    position: 'absolute',
    right:20
  },
})