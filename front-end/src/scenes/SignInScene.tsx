import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AuthCard from '../component/authCard';
import { LinearGradient } from 'expo-linear-gradient';
import {KeyboardAvoidingView} from 'react-native';

type Props = {};
type State = {};

export default class SignInScene extends Component<Props, State> {
  render() {
    return (
      <View style={styles.view}>
        <KeyboardAvoidingView  style={styles.view} behavior="padding" enabled>
          <LinearGradient
            style={styles.container}
            colors={['#454545', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
              <AuthCard mode="singin"></AuthCard>
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
