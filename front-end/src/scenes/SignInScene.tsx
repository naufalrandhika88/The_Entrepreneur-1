import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthCard from '../component/AuthCard';
import { LinearGradient } from 'expo-linear-gradient';
import {KeyboardAvoidingView} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';

type Props = NavigationScreenProps
type State = {}

export default class SignInScene extends Component<Props, State> {
  signInAction = ()=>{
    this.props.navigation.navigate('Main')
  };
  forgotPasswordAction = ()=>{

  };

  render() {
    return (
      <View style={styles.view}>
        <KeyboardAvoidingView  style={styles.view} behavior="padding" enabled>
          <LinearGradient
            style={styles.container}
            colors={['#454545', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
              <AuthCard signInAction={this.signInAction}
              forgotPasswordAction={this. forgotPasswordAction} mode="singin"></AuthCard>
            </LinearGradient>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view:{
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16
  },
});
