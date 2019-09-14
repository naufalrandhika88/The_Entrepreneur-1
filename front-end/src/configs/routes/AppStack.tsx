import SignInScene from "../../scenes/SignInScene";
import SignUpScene from "../../scenes/SignUpScene";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

const AppStack=createSwitchNavigator({
    SignIn:{
        screen: SignInScene,
        navigationOptions: {
            header: null,
        },
    },
    SignUp:{
        screen: SignUpScene,
        navigationOptions: {
            header: null,
        },
    },
},
);

export default AppStack;
