import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import HomeScene from '../../scenes/HomeScene';
import UpgradeScene from '../../scenes/UpgradeScene';
import MembershipScene from '../../scenes/MembershipScene';

const HomeStack = createStackNavigator({
  Home: HomeScene,
  Upgrade: UpgradeScene,
  Membership: MembershipScene,
});


export default HomeStack;
