import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import TransactionScene from "../../scenes/TransactionScene";

const TransactionStack=createStackNavigator({
    Transaction: TransactionScene
},
);

export default TransactionStack;
