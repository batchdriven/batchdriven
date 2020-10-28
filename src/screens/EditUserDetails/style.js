import { StyleSheet } from 'react-native';
import Colors from '../../constatnts/Colors';
export default {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    fontSize: 14,
    width: '90%',
    borderColor: Colors.borderColor,
    borderBottomWidth: 1,
    paddingTop: 8,
    marginVertical: 15
  },
  btn: {
    backgroundColor: Colors.primaryColor, height: 48,
    alignSelf: 'center', justifyContent: 'center',
    width: '90%', alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  btn_txt: {
    fontSize: 14, color: '#fff',
    textTransform: 'uppercase',

  }
}