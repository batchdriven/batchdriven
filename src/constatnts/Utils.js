import React from 'react';
import Toast from 'react-native-root-toast';


// Add a Toast on screen.
toastShow = (msg) => {
  console.log('msg : ', msg)
  Toast.show('show meaage', {
    visible: true,
    backgroundColor: 'green',
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


export default {
  toastShow,
  _emailValidate
}