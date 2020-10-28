import React from 'react';
import { SafeAreaView, View, StatusBar, LogBox } from 'react-native';
import Colors from './src/constatnts/Colors';

import Navigation from './src/navigations/MainNavigation';
import EditUserDetails from './src/screens/EditUserDetails/EditUserDetails';
import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore();
store.getState();


LogBox.ignoreAllLogs();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryColor} />
      <SafeAreaView>
        <View style={{ height: '100%' }}>
          <Navigation />
        </View>

      </SafeAreaView>
    </Provider>
  );
};



export default App;
