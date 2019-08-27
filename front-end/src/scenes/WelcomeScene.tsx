import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {};
type State = {};

export default class WelcomeScene extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome scene!</Text>
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
