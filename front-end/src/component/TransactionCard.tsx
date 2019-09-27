import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Texts from '../core-ui/Text';
import Icon from '../core-ui/Icon';

type Props = {
  transactionTitle: ReactNode;
  dateTransaction: ReactNode;
  status: ReactNode;
  mode1: 'membership' | 'event';
  mode2: 'red' | 'green' | 'black';
};

export default function TransactionCard(prop: Props) {
  let { transactionTitle, dateTransaction, status, mode1, mode2 } = prop;

  const styles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      paddingTop: 24,
      paddingLeft: 27,
      width: 317,
      height: 48,
      paddingBottom: 24,
    },
    segmentContent: {
      flexDirection: 'column',
      width: 258,
      height: 48,
      paddingLeft: 27,
    },
    spacing: {
      height: 6,
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
        <Texts type="body">{transactionTitle}</Texts>
        <View style={styles.spacing}></View>
        <Texts type="display1">{dateTransaction}</Texts>
        <View style={styles.spacing}></View>
        {mode2 === 'red' ? (
          <Texts color="red" type="display1">
            Status: {status}
          </Texts>
        ) : (
          <Texts color="green" type="display2">
            Status: {status}
          </Texts>
        )}
      </View>
    </View>
  );
}
