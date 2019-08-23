import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// import AppStack from './AppStack';
import AuthStack from './AuthStack';
import WelcomeScene from '../../scenes/WelcomeScene';

const AppNavigator = createSwitchNavigator(
  {
    // App: AppStack,
    Auth: AuthStack,
    Welcome: WelcomeScene,
  },
  {
    initialRouteName: 'Welcome',
  },
);

export default createAppContainer(AppNavigator);
