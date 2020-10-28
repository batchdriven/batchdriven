import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Keyboard } from 'react-native'
import Utils from "../../constatnts/Utils";
import { Loader } from "../../components/Loader";

import Firebase from '../../config/config'
import Colors from "../../constatnts/Colors";
import styles from './style'

export default class SignUp extends React.Component {
  state = { name: '', email: '', password: '', cpassword: '', errorMessage: null, loading: false }
  handleSignUp = () => {
    Keyboard.dismiss()
    if (this.state.name.trim().length == 0) {
      return alert('Name is required');
    }

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


    if (this.state.cpassword.trim().length == 0) {
      return alert('Confirm Password is required');
    }

    if (this.state.password !== this.state.cpassword) {
      return alert('Password and confirm password should be same');
    }

    this.showLoader()

    Firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log('register : ', response.user.uid)
        const uid = response.user.uid
        const data = {
          id: uid,
          email: this.state.email,
          name: this.state.name,
        };
        const usersRef = Firebase.firestore()
        usersRef
          .collection('users')
          .doc(uid)
          .set(data)
          .then((docRef) => {
            this.hideLoader()
            console.log("Document written with ID: ", docRef);
            this.props.navigation.navigate('Home')
          })
          .catch((error) => {
            this.hideLoader()
            console.error("Error adding document: ", error);
          });
      })
      .catch((error) => {
        this.hideLoader()
        alert(error.message)
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
        <Text style={{ color: Colors.primaryColor, fontSize: 40 }}>Sign Up</Text>
        {/* {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>} */}

        <TextInput
          placeholder="Name"
          autoCapitalize="words"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={cpassword => this.setState({ cpassword })}
          value={this.state.cpassword}
        />
        <TouchableOpacity onPress={this.handleSignUp} style={styles.btn}>
          <Text style={styles.btn_txt}>Sign Up</Text>
        </TouchableOpacity>
        <View>
          <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: Colors.primaryColor, fontSize: 18 }}> Login </Text></Text>
        </View>
        <Loader loading={this.state.loading} />
      </View>
    )
  }
}