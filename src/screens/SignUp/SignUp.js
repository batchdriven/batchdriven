import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Keyboard } from 'react-native'
import Utils from "../../constatnts/Utils";
import { Loader } from "../../components/Loader";

import Firebase from '../../config/config'
import Colors from "../../constatnts/Colors";
import styles from './style'
import md5 from "md5";

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

    if (this.state.password.trim().length < 6) {
      alert('Password must contain at least 6 characters')
      return;
    }

    if (this.state.cpassword.trim().length == 0) {
      return alert('Confirm Password is required');
    }

    if (this.state.password !== this.state.cpassword) {
      return alert('Password and confirm password should be same');
    }

    this.showLoader()

    const usersRef = Firebase.firestore()

    usersRef
      .collection('users')
      .where('email', '==', this.state.email)
      .get()
      .then((docRef) => {
        this.hideLoader()
        console.log("Document written with ID: ", docRef.docs);
        if (docRef.docs.length == 0) {

          const id = Utils.guidGenerator()
          const jsonData = {
            id: id,
            name: this.state.name.trim(),
            email: this.state.email.trim(),
            password: md5(this.state.password)
          }
          usersRef.collection('users')
            .doc(id)
            .set(jsonData)
            .then((response) => {
              console.log('User added!', response);
              alert('User registered succesfully')
              Utils.saveData(jsonData)
              this.props.navigation.navigate('Home')
            }).catch((error) => {
              this.hideLoader()
              console.error("Error adding document: ", error);
            });

        } else {
          alert('The email address is already in use by another account.')
        }

        //this.props.navigation.navigate('Home')
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
          ref="name"
          onSubmitEditing={() => this.refs.email.focus()}
          returnKeyType='next'
        />

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          ref="email"
          onSubmitEditing={() => this.refs.password.focus()}
          returnKeyType='next'
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          ref="password"
          onSubmitEditing={() => this.refs.cpassword.focus()}
          returnKeyType='next'
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={cpassword => this.setState({ cpassword })}
          value={this.state.cpassword}
          ref="cpassword"
          onSubmitEditing={() => this.refs.cpassword.focus()}
          returnKeyType='done'
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