import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { navigationOption } from '../component/NavBar';
import InboxCard from '../component/InboxCard';

type Props = {};
type State = {};

export default class InboxScene extends Component<Props, State> {
  static navigationOptions = navigationOption('Inbox');

  render() {
    return (
      <SafeAreaView style={styles.view}>
        <InboxCard
          dateInbox="02 Oktober 2019"
          titleInbox="Your e-ticket for talkshowmotivasi karya been issued"
        ></InboxCard>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  spacing1: {
    height: 4,
  },
  spacing2: {
    height: 8,
  },
  spacing3: {
    height: 16,
  },
});
