import { StyleSheet } from 'react-native';
import Colors from '../../constatnts/Colors';
export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  textInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    borderColor: Colors.borderColor,
    borderBottomWidth: 1,
    paddingTop: 8,
    marginVertical: 15,
  },
  btn: {
    backgroundColor: Colors.primaryColor, height: 48,
    alignSelf: 'center', justifyContent: 'center',
    width: '100%', alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  btn_txt: {
    fontSize: 14, color: '#fff',
    textTransform: 'uppercase',

  }
}