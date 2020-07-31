import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  mainText: {
    color:"blue",
    padding: 16,
    textAlign: "center",
    fontWeight: 'bold',
  },

  action: {
    backgroundColor: 'blue',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  actionText: {
    color: "white",
    padding: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },

  bonus: {
    marginTop: 20,
    color: '#222'
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',   
    textAlign: 'left',
    height: 40,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10
  },
})