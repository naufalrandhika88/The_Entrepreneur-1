import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthCard from '../component/authCard';
import { LinearGradient } from 'expo-linear-gradient';
import {KeyboardAvoidingView} from 'react-native';
import {NavigationScreenProps, StackActions, NavigationActions} from 'react-navigation';
import { k16 } from '../constants/dimens';

type Props = NavigationScreenProps
type State = {}

export default class SignInScene extends Component<Props, State> {
  state!: State;

  componentDidMount(){
    this.setState({
      'email': String,
      'password': String,
    })
  }

  signInAction = ()=>{
    const successSignin = StackActions.reset({
      index: 0, 
      key: null,
      actions: [
           NavigationActions.navigate({ routeName: 'Main' })
      ],
    });
    this.props.navigation.dispatch(successSignin);
  };

  onChangeValueEmail=(text: String)=>{
    this.setState({
      'email': text
    })
    console.log(JSON.stringify(this.state))
  }

  onChangeValuePassword=(text: String)=>{
    this.setState({
      'password': text
    })
    console.log(JSON.stringify(this.state))
  }

  forgotPasswordAction = ()=>{

  };


  render() {
    return (
      <View style={styles.view}>
        <KeyboardAvoidingView style={styles.view} behavior="padding" enabled>
          <LinearGradient
            style={styles.container}
            colors={['#454545', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
              <AuthCard signInAction={this.signInAction}
              onChangeValueEmail={this.onChangeValueEmail}
              onChangeValuePassword={this.onChangeValuePassword}
              forgotPasswordAction={this.forgotPasswordAction} mode="singin"></AuthCard>
            </LinearGradient>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: k16,
  },
});
