import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Keyboard } from 'react-native'
import styles from './style'

import Firebase from '../../config/config'
import { Loader } from '../../components/Loader'
import Colors from '../../constatnts/Colors'
import Utils from '../../constatnts/Utils'

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
    Firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log('response : ', response.user.uid)
        const uid = response.user.uid
        // const usersRef = Firebase.database().ref(`/users/${uid}`)

        const usersRef = Firebase.firestore()
        usersRef
          .collection('users')
          .doc(uid)
          .get()
          .then((docRef) => {
            this.hideLoader()
            console.log("Document written with Data: ", docRef.data);
            Utils.toastShow('User register successfully')
            this.props.navigation.navigate('Home')
          })
          .catch((error) => {
            this.hideLoader()
            console.error("Error adding document: ", error);
          });

      })
      .catch(error => {
        //this.setState({ errorMessage: error.message })
        alert(error.message)
        this.hideLoader()
      })
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
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
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