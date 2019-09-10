import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation";

import WelcomeScene from '../../scenes/WelcomeScene';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: {
      screen: AppStack,
      navigationOptions: {
        header: null,
      },
    },
    Welcome: {
      screen: WelcomeScene,
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Welcome',

  },
);

export default createAppContainer(AppNavigator);
