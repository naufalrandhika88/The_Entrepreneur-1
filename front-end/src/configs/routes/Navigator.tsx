import { createSwitchNavigator, createAppContainer } from 'react-navigation';

//import AuthStack from './AuthStack';
import AuthStack from './AuthStack';
import MainNavigation from '../../scenes/MainNavigation';

const AppNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: AuthStack,
    },
    Main:{
      screen: MainNavigation,
    }
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
