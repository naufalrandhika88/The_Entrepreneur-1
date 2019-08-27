import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Texts from '../core-ui/Text';

type Props = {};
type State = {};

export default class WelcomeScene extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
                  <Texts content={'456'} type={"display3"}/>

          <Texts content={'456'} type={"headline"}/>
         <Texts content={'456'} type={"subheading"}/>
         <Texts content={"789"} type={"body1"}/>
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
