import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Firebase, { db } from '../config/config'
import Colors from "../constatnts/Colors";

export default class Splash extends Component {
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'Login')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.primaryColor, fontSize: 40 }}>Loading</Text>
        <ActivityIndicator color={Colors.primaryColor} size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});