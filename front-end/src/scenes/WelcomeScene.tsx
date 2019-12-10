import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import WelcomeCard from '../component/Welcomecard';
import { LinearGradient } from 'expo-linear-gradient';

import { NavigationScreenProps, StackActions, NavigationActions } from 'react-navigation';
import { k16 } from '../constants/dimens';
import { SessionSaga } from '../sagas/sessionSaga';
import Toast from 'react-native-root-toast';
import { User } from '../model/user';

type Props = NavigationScreenProps;
type State = {};

export default class WelcomeScene extends Component<Props, State> {
  sessionSaga: SessionSaga = new SessionSaga

  loginAction = () => {
    this.props.navigation.navigate('SignIn');
  };
  signUpAction = () => {
    this.props.navigation.navigate('SignUp');
  };
  googleSignAction = () => {};

  componentWillMount=async ()=>{
    var user: User = await this.sessionSaga.getSession()
    if(user != null){
      //you are logged in
      Toast.show("Welcome back, "+user.full_name, {
        backgroundColor: "#0ba257",
        duration: 1000,
        opacity: 0.8,
        position: Toast.positions.BOTTOM
      })
      const successSignin = StackActions.reset({
        index: 0, 
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: 'Main' })
        ],
      });
      this.props.navigation.dispatch(successSignin);
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <LinearGradient
          style={styles.container}
          colors={['#454545', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <WelcomeCard
            loginGoogleAction={this.googleSignAction}
            signUpAction={this.signUpAction}
            loginAction={this.loginAction}
          ></WelcomeCard>
        </LinearGradient>
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
