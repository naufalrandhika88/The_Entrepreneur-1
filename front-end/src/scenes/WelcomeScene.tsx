import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import WelcomeCard from '../component/WelcomeCard';
import { LinearGradient } from 'expo-linear-gradient';

import { NavigationScreenProps } from 'react-navigation';
import { k16 } from '../constants/dimens';

type Props = NavigationScreenProps;
type State = {};

export default class WelcomeScene extends Component<Props, State> {
  loginAction = () => {
    this.props.navigation.navigate('SignIn');
  };
  signUpAction = () => {
    this.props.navigation.navigate('SignUp');
  };
  googleSignAction = () => {};

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
