import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import HomeScene from "../../scenes/HomeScene";

const HomeStack=createStackNavigator({
    Home: HomeScene
},
);

export default HomeStack;
