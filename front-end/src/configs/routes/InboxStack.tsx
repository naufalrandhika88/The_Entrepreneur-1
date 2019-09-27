import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import InboxScene from "../../scenes/InboxScene";

const InboxStack=createStackNavigator({
    Inbox: InboxScene
},
);

export default InboxStack;
