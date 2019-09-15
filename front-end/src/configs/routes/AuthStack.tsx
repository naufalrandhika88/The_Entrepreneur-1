import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import SignInScene from '../../scenes/SignInScene';
import SignUpScene from '../../scenes/SignUpScene';
import WelcomeScene from '../../scenes/WelcomeScene';

const AuthStack = createStackNavigator({
  Welcome:{
    screen: WelcomeScene,
    navigationOptions: { header: null },
  },
  SignIn: {
    screen: SignInScene,
    navigationOptions: { header: null },
  },
  SignUp: {
    screen: SignUpScene,
    navigationOptions: { header: null },
  },
});

export default AuthStack;
