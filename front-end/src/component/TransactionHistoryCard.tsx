import React, { ReactNode, Key } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import {k24 } from '../constants/dimens';
import {VerticalSpacer1 } from '../core-ui/Spacer';

type Props = {
  key: Key;
  transactionTitle: ReactNode;
  dateTransaction: ReactNode;
  status: ReactNode;
  mode1: 'membership' | 'event';
};

export default function TransactionHistoryCard(prop: Props) {
  let { transactionTitle, dateTransaction, mode1, } = prop;

  const styles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      padding: k24,
      alignItems: "center"
    },
    segmentContent: {
      flexDirection: 'column',
      width: 258,
      height: 48,
      paddingLeft: 27,
    },
  });

  return (
    <View style={styles.containerStyle}>
      {mode1 === 'membership' ? (
        <Icon name="membership"></Icon>
      ) : (
        <Icon name="eventlogo"></Icon>
      )}
      <View style={styles.segmentContent}>
        <Text type="body">{transactionTitle}</Text>
        <VerticalSpacer1/>
        <Text type="display1">{dateTransaction}</Text>
        <VerticalSpacer1/>
      </View>
    </View>
  );
}
