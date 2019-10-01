import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { k16 } from '../constants/dimens';
import Icon from '../core-ui/Icon';
import { headerBarColor } from '../constants/color';


type Props = {};
type State = {};

export default class HelloWorldScene extends Component<Props, State>{
    static navigationOptions={
        title: "Upgrade",
        headerStyle: {
            backgroundColor: headerBarColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight:(
              <View style={{paddingRight: 16}}>
                  <Icon name="qr"/>
              </View>
          )
    };
      
    render() {
        return (
            <SafeAreaView style={styles.view}>
                <Text>HelloWorldScene Scene</Text>
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
        padding:k16,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
    },
  });
  