import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Keyboard, AsyncStorage } from 'react-native'
import styles from './style'

import Firebase from '../../config/config'
import { Loader } from '../../components/Loader'
import Colors from '../../constatnts/Colors'
import Utils from '../../constatnts/Utils'
import md5 from 'md5'
import Constant from '../../constatnts/Constant'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null, loading: false }

  handleLogin = () => {
    Keyboard.dismiss()
    if (this.state.email.trim().length == 0) {
      return alert('Email Id is required');
    }

    if (!Utils._emailValidate(this.state.email)) {
      alert('Enter a valid Email Id')
      return;
    }

    if (this.state.password.trim().length == 0) {
      return alert('Password is required');
    }

    this.showLoader()
    const usersRef = Firebase.firestore()
    usersRef
      .collection('users')
      .where('email', '==', this.state.email)
      .get()
      .then((docRef) => {
        this.hideLoader()
        //console.log("Document written with ID: ", docRef.docs);
        if (docRef.docs.length == 0) {

          alert('There is no user record corresponding to this identifier. The user may have been deleted.')

        } else {

          usersRef
            .collection('users')
            .where('email', '==', this.state.email)
            .where('password', '==', md5(this.state.password))
            .get()
            .then((docRef1) => {
              this.hideLoader()
              //console.log("Data: ", docRef1.docs);
              if (docRef1.docs.length == 0) {
                alert('There is no user record corresponding to this identifier. The user may have been deleted.')
              } else {
                //alert('User Logged In Successfully')
                let data = null
                docRef1.forEach(documentSnapshot => {
                  console.log(documentSnapshot.data());
                  data = documentSnapshot.data()
                });
                Utils.saveData(data)
                this.props.navigation.navigate('Home')
              }

            }).catch((error) => {
              this.hideLoader()
              console.error("Error adding document: ", error);
            });

        }

      })
      .catch((error) => {
        this.hideLoader()
        console.error("Error adding document: ", error);
      });
  }
  showLoader = () => {
    this.setState({ loading: true });
  }

  hideLoader = () => {
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.primaryColor, fontSize: 40 }}>Login</Text>
        {/* {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>} */}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          ref="email"
          onSubmitEditing={() => this.refs.password.focus()}
          returnKeyType='next'
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          ref="password"
          onSubmitEditing={() => this.refs.cpassword.focus()}
        />
        <TouchableOpacity onPress={this.handleLogin} style={styles.btn}>
          <Text style={styles.btn_txt}>Login</Text>
        </TouchableOpacity>

        <View>
          <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{ color: Colors.primaryColor, fontSize: 18 }}> Sign Up </Text></Text>
        </View>
        <Loader loading={this.state.loading} />
      </View>
    )
  }
}