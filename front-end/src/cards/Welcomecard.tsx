import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Card } from 'react-native-elements';

import { WHITE } from '../constants/color';
import Texts from '../core-ui/Text';
import Button from '../core-ui/Button';

export default function WelcomeCard() {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: WHITE,
      paddingTop: 40,
      width: 328,
      height: 334,
      borderRadius: 4,
      alignItems: 'center',
    },
    spacing: {
      height: 32,
    },
    spacing1: {
      height: 46,
    },
    spacing2: {
      height: 16,
    },
    textstyle: {
      paddingLeft: 70,
    },
    textstyleOr: {
      paddingLeft: 80,
    },
    buttonstyle: {
      marginLeft: 20,
      width: 280,
    },
    lineStyle: {
      borderWidth: 0.5,
      borderColor: 'black',
      margin: 5,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Texts
        children="Welcome, Entrepreneurs!"
        type="headline"
        style={styles.textstyle}
      ></Texts>
      <View style={styles.spacing} />
      <Button
        buttonType="default"
        text="SIGN IN"
        newStyleButton={styles.buttonstyle}
        onPress={() => {}}
      />
      <View style={styles.spacing2} />
      <Texts
        children="─────────── or ───────────"
        type="display2"
        style={styles.textstyleOr}
      ></Texts>
      <View style={styles.spacing2} />
      <Button
        buttonType="outline"
        newStyleButton={styles.buttonstyle}
        onPress={() => {}}
      />
      <View style={styles.spacing2} />
      <Texts
        children="Already have an account? Login here"
        type="display1"
        style={styles.textstyle}
      ></Texts>
    </Card>
  );
}
