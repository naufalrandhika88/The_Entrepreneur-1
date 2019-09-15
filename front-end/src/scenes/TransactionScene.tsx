import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, View, } from 'react-native';
import { headerBarColor } from '../constants/color';
import Icon from '../core-ui/Icon';


type Props = {};
type State = {};

export default class TransactionScene extends Component<Props, State>{
    static navigationOptions = {
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
      };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                  <Text>Transaction Scene</Text>
            </SafeAreaView>
        );
      }
}

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
    spacing1: {
        height: 4,
      },
    spacing2: {
        height: 8,
    },
    spacing3: {
        height: 16,
    },
  });
  