import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Texts from '../core-ui/Text';

type Props = {};
type State = {};

export default class WelcomeScene extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Texts content='Heading3' type="display3" color="blue"/>
        <Texts content='456' type="headline" color="red"/>
        <Texts content='456' type="subheading" color="yellow"/>
        <Texts content="789" type="body"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
