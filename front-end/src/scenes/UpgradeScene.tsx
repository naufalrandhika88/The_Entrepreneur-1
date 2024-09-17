import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Text from '../core-ui/Text';
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
          <View style={styles.row}>
            <VerticalSpacer2 />
            <Text type="subheading" children="Upgrade To "></Text>
            <Text type="subheading" children="Premium" color="yellow"></Text>
          </View>
          <VerticalSpacer3 />
          <Text type="body" children="You Will Get: "></Text>
          <VerticalSpacer2 />
          <View style={styles.textlist}>
            <Text
              type="display1"
              children="1. Booth discount - 5% (platinum only)"
            ></Text>
            <Text
              type="display1"
              children="2. VIP registration/seating at the general session - 50% (platinum), 30 (gold), 15 (silver), 5 (bronze)"
            ></Text>
            <Text type="display1" children="3. Premium badge recognition" />
            <Text
              type="display1"
              children="4. Premium level acknowledgment booth carpet decals - 2 (platinum), 1 (gold)"
            />
            <Text
              type="display1"
              children="5. Show floor acknowledgment signage"
            />
            <Text
              type="display1"
              children="6. Premium level acknowledgment table signs"
            />
          </View>

          <VerticalSpacer4 />
          <View style={styles.row1}>
            <VerticalSpacer1 />
            <Text type="body" children="ID   " style={styles.marginTop1} />
            <Text
              style={styles.textnumber}
              children="1.350.000"
              color="yellow"
            />
          </View>

          <VerticalSpacer4 />
          <Button
            buttonType="yellow"
            text="UPGRADE NOW"
            onPress={() => {
              this.props.navigation.navigate('Membership');
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
  row1: {
    flexDirection: 'row',
    marginTop: 8,
  },
  marginTop1: {
    marginTop: 15,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 48,
  },
  textnumber: {
    fontSize: 32,
  },
  menu: {
    flexDirection: 'row',
  },
  textlist: {
    width: 248,
    height: 140,
  },
});
