import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, } from 'react-native';
import { navigationOption } from '../component/NavBar';


type Props = {};
type State = {};

export default class TransactionScene extends Component<Props, State>{
    static navigationOptions= navigationOption("Transaction");

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
  