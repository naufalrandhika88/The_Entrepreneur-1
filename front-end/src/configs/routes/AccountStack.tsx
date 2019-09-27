import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import AccountScene from "../../scenes/AccountScene";

const AccountStack=createStackNavigator({
    Account: AccountScene
},
);

export default AccountStack;
