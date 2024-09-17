import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthCard from '../component/authCard';
import {
  NavigationScreenProps,
  NavigationContainerComponent,
} from 'react-navigation';
import { RootState } from '../types/State';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

type Props = NavigationScreenProps & {
  message: string;
  register: (
    email: string,
    password: string,
    _navigator: NavigationContainerComponent,
  ) => void;
  reset_error: () => void;
};

type RegisterSceneState = {
  email: string;
  password: string;
  re_password: string;
};

export class SignUpScene extends Component<Props, RegisterSceneState> {
 
  state: RegisterSceneState = {
    email: '',
    password: '',
    re_password: '',
  };

  componentDidUpdate() {
    if (this.props.message !== '') {
      alert(this.props.message);
      let { reset_error } = this.props;
      reset_error();
    }
  }

  forgotPasswordAction = () => {};
  render() {
    return (
      <View style={styles.view}>
        <KeyboardAvoidingView style={styles.view} behavior="padding" enabled>
          <LinearGradient
            style={styles.container}
            colors={['#454545', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <AuthCard
              forgotPasswordAction={this.forgotPasswordAction}
              signInAction={this._onRegister}
              onChangeValueEmail={this._onEmailChange}
              onChangeValuePassword={this._onPasswordChange}
              onChangeRePassword={this._onRePasswordChange}
              mode="signup"
            ></AuthCard>
          </LinearGradient>
        </KeyboardAvoidingView>
      </View>
    );
  }

  _onRegister = () => {
    let { email, password, re_password } = this.state;
    let { register } = this.props;

    let _navigator: any = this.props.navigation;

    if (password === re_password) {
      register(email, password, _navigator);
    } else {
      alert('Password must be match!');
    }
  };

  _onEmailChange = (valueEmail: string) => {
    this.setState({ email: valueEmail });
  };

  _onPasswordChange = (valuePassword: string) => {
    this.setState({ password: valuePassword });
  };

  _onRePasswordChange = (valueRePassword: string) => {
    this.setState({ re_password: valueRePassword });
  };
}

let mapStateToProps = (state: RootState) => {
  let { signUpState } = state;
  return {
    message: signUpState.message,
  };
};

let mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    register: (
      email: string,
      password: string,
      _navigator: NavigationContainerComponent,
    ) => {
      dispatch({
        type: 'REGISTER_REQUESTED',
        email,
        password,
        _navigator,
      });
    },
    reset_error: () => {
      dispatch({ type: 'RESET_ERROR' });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScene);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
});
