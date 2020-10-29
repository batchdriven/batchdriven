import React from 'react';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import Constant from './Constant';


// Add a Toast on screen.
toastShow = (msg) => {
  console.log('msg : ', msg)
  Toast.show(msg, {
    visible: true,
    opacity: 1,
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,

    onShow: () => {
      // calls on toast\`s appear animation start
      console.log('onShow')
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
      console.log('onShown')
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
      console.log('onHide')
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
      console.log('onHidden')
    }
  });

}

_emailValidate = (text) => {
  console.log(text);
  //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(text) === false) {
    console.log("Enter a valid email address");
    return false;
  } else {
    console.log("Email is Correct");
    return true;
  }
}

saveData = async (data) => {
  console.log('saveData : ', data)
  try {
    await AsyncStorage.setItem(Constant.USERINFO, JSON.stringify(data))
    console.log('Data successfully saved', JSON.stringify(data))
  } catch (e) {
    console.log('Failed to save the data to the storage')
  }
}

guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export default {
  toastShow,
  _emailValidate,
  saveData,
  guidGenerator
}