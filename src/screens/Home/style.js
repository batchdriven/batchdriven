import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constatnts/Colors';
export default {
  container: {
    flex: 1,
  },
  row: {
    padding: 16,
    flex: 1,
    margin: 20,
    marginTop: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,

    elevation: 3,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.primaryColor,
    borderRadius: 50 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,

    elevation: 3,
  },

  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,

  },
}