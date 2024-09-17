import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import TransactionScene from "../../scenes/TransactionScene";
import { navigationOption } from "../../component/NavBar";
import { headerBarColor } from "../../constants/color";
import React from 'react';
import { View } from "react-native";
import Icon from "../../core-ui/Icon";

const TransactionStack=createStackNavigator({
    Transaction: {
        screen: TransactionScene,
        navigationOptions:{
            title: "Transaction",
            headerStyle: {
                backgroundColor: headerBarColor,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft:(
                  <View style={{paddingLeft: 16}}>
                       <Icon name="logo"/>
                  </View>
              ),
              headerRight:(
                  <View style={{paddingRight: 16}}>
                      <Icon name="qr"/>
                  </View>
              )
        }
    }
}
);

export default TransactionStack;
