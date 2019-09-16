import React from 'react';
import Texts from '../core-ui/Text';
import { Dimensions, View, StyleSheet } from 'react-native';
import { WHITE } from '../constants/color';
import TextInput from '../core-ui/textInput';
import Button from '../core-ui/Button';

type Props = {
  mode: 'singin' | 'signup';
};

export default function AuthCard(props: Props) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  let { mode } = props;

  const styles = StyleSheet.create({
    outer: {
      margin: 16,
      backgroundColor: WHITE,
      padding: 32,
      width: width - 32,
      borderRadius: 8,
      alignContent: 'stretch',
      alignItems: 'center',
    },
    form: {
      minWidth: width * 0.8,
      borderBottomWidth: 2,
    },
    label: {
      color: '#C7C7C7',
    },
    spacer: {
      height: 24,
    },
    right: {
      alignContent: 'flex-end',
    },
  });

  return (
    <View style={styles.outer}>
      {mode == 'singin' ? (
        <Texts type="headline" children="Sign In"></Texts>
      ) : (
        <Texts type="headline" children="Sign Up"></Texts>
      )}
      <TextInput
        label="Email"
        placeholder="Type your email"
        containerStyle={styles.form}
        labelStyle={styles.label}
        onChangeText={() => {}}
      />
      <View style={styles.spacer} />
      <TextInput
        label="Password"
        placeholder="Type your password"
        isEncrypt={true}
        containerStyle={styles.form}
        labelStyle={styles.label}
        onChangeText={() => {}}
      />
      <View style={styles.spacer} />
      {mode == 'signup' ? (
        <TextInput
          label="Repeat Password"
          isEncrypt={true}
          placeholder="Type your password again"
          containerStyle={styles.form}
          labelStyle={styles.label}
          onChangeText={() => {}}
        />
      ) : (
        <Texts children="Forgot Password" style={styles.right}></Texts>
      )}
      <View style={styles.spacer} />
      {mode == 'signup' ? (
        <Button buttonType="default" text="SIGN UP" onPress={() => {}}></Button>
      ) : (
        <Button buttonType="default" text="SIGN IN" onPress={() => {}}></Button>
      )}
    </View>
  );
}
