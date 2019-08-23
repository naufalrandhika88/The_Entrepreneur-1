import { createStackNavigator } from 'react-navigation';

import SignInScene from '../../scenes/SignInScene';
import SignUpScene from '../../scenes/SignUpScene';

const AuthStack = createStackNavigator({
  Login: {
    screen: SignInScene,
    navigationOptions: { header: null },
  },
  Register: {
    screen: SignUpScene,
    navigationOptions: { header: null },
  },
});

export default AuthStack;
