import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import Texts from '../core-ui/Text';
import { navigationOption } from '../component/ButtonBackNavBar';
import Icon from '../core-ui/Icon';
import Button from '../core-ui/Button';
import {
  VerticalSpacer2,
  VerticalSpacer3,
  VerticalSpacer4,
  VerticalSpacer1,
} from '../core-ui/Spacer';
import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps;
type State = {};

export default class UpgradeScene extends Component<Props, State> {
  static navigationOptions = navigationOption('Upgrade Membership');
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          <Icon customStyle={styles.icon} name="upgrademembership" />
          <VerticalSpacer2 />
          <View style={styles.column}>
            <VerticalSpacer2 />
            <Texts type="subheading" children="You are Now a "></Texts>
            <View style={styles.row}>
              <Texts
                type="subheading"
                children="Premium "
                color="yellow"
              ></Texts>
              <Texts type="subheading" children="Member"></Texts>
            </View>
          </View>
          <VerticalSpacer3 />
          <VerticalSpacer4 />
          <VerticalSpacer4 />
          <VerticalSpacer4 />
          <VerticalSpacer4 />
          <VerticalSpacer4 />
          <Button
            buttonType="yellow"
            text="THANKS ! "
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          ></Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 168,
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
