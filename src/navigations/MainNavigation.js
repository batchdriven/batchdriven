import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import Splash from '../screens/Splash';
import Home from '../screens/Home/Home';
import EditUserDetails from '../screens/EditUserDetails/EditUserDetails';


const Main = createStackNavigator(
  {
    Home,
    EditUserDetails
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
  },
);
const Auth = createStackNavigator(
  {
    SignUp,
    Login
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    headerLayoutPreset: 'center',
  }
);
const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      Splash,
      Auth,
      Main
    },
    {
      initialRouteName: 'Splash'
    }
  )
)

export default Navigation