import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import HomeStack from '../configs/routes/HomeStack';
import InboxStack from '../configs/routes/InboxStack';
import TransactionStack from '../configs/routes/TransactionStack';
import AccountStack from '../configs/routes/AccountStack';
import Icon from '../core-ui/Icon';


const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon:() => <Icon name="home"/>
    }
  },
  Transaction: {
    screen: TransactionStack,
    navigationOptions: {
      tabBarIcon:() => <Icon name="transaction" />
    }
  },
  Inbox: {
    screen: InboxStack,
    navigationOptions: {
      tabBarIcon:() => <Icon name="inbox"/>
    }
  },
  Account: {
    screen: AccountStack,
    navigationOptions: {
      tabBarIcon:() => <Icon name="account"/>
    }
  }
},{
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
},
);

var MainNavigation = createAppContainer(TabNavigator);
export default MainNavigation;