import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer, ScrollView } from 'react-navigation';
import { headerBarColor, WHITE } from '../constants/color';
import Icon from '../core-ui/Icon';
import TransactionCard from '../component/TransactionCard';
import TransactionHistoryCard from '../component/TransactionHistoryCard';

class OngoingScreen extends React.Component {
    render() {
      return (
        <ScrollView>
          <TransactionCard 
          key={Math.random()}
          dateTransaction="12/2/2019"
          mode1="event"
          mode2="black"
          status="Hello"
          transactionTitle="Hello Title"
          ></TransactionCard>
          <TransactionCard 
          key={Math.random()}
          dateTransaction="12/2/2019"
          mode1="event"
          mode2="black"
          status="Hello"
          transactionTitle="Hello Title"
          ></TransactionCard>
          <TransactionCard 
          key={Math.random()}
          dateTransaction="12/2/2019"
          mode1="event"
          mode2="black"
          status="Hello"
          transactionTitle="Hello Title"
          ></TransactionCard>
          <TransactionCard 
          key={Math.random()}
          dateTransaction="12/2/2019"
          mode1="event"
          mode2="black"
          status="Hello"
          transactionTitle="Hello Title"
          ></TransactionCard>
        </ScrollView>
      );
    }
  }
  
class HistoryScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <TransactionHistoryCard 
        key={Math.random()}
        transactionTitle="Tes"
        dateTransaction="09/12/2019"
        mode1="event"
        ></TransactionHistoryCard>
        <TransactionHistoryCard 
        key={Math.random()}
        transactionTitle="Tes"
        dateTransaction="09/12/2019"
        mode1="event"
        ></TransactionHistoryCard>
        <TransactionHistoryCard 
        key={Math.random()}
        transactionTitle="Tes"
        dateTransaction="09/12/2019"
        mode1="event"
        ></TransactionHistoryCard>
        <TransactionHistoryCard 
        key={Math.random()}
        transactionTitle="Tes"
        dateTransaction="09/12/2019"
        mode1="event"
        ></TransactionHistoryCard>
      </ScrollView>
    );
  }
}
  
const TransactionTab = createMaterialTopTabNavigator({
    Ongoing: OngoingScreen,
    History: HistoryScreen,
},{
  tabBarOptions:{
    style:{
      backgroundColor: headerBarColor,
    },
    indicatorStyle:{
      backgroundColor: WHITE
    }
  },
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
})

export default createAppContainer(TransactionTab);

const styles = StyleSheet.create({
    view:{
        flex: 1,
    },
    flex1:{
        flex: 1,
    },
    scrollContainer: {
        padding:16,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
    },
  });
  