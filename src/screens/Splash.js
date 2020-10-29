import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import Firebase, { db } from '../config/config'
import Colors from "../constatnts/Colors";
import Constant from "../constatnts/Constant";

export default class Splash extends Component {

  componentDidMount = async () => {
    var user = await AsyncStorage.getItem(Constant.USERINFO);
    if (user !== undefined && user) {
      this.props.navigation.navigate('Main');
    } else {
      this.props.navigation.navigate('Login');
    }

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