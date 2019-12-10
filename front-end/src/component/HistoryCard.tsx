import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Texts from '../core-ui/Text';
import Icon from '../core-ui/Icon';

type Props = {
  transactionTitle: ReactNode;
  dateTransaction: ReactNode;
  mode1: 'membership' | 'event';
};

export default function HistoryCard(prop: Props) {
  let { transactionTitle, dateTransaction, mode1 } = prop;

  return (
    <View>
      <View style={styles.containerStyle}>
        {mode1 == 'membership' ? (
          <Icon name="membership"></Icon>
        ) : (
          <Icon name="eventlogo"></Icon>
        )}
        <View style={styles.segmentContent}>
          <Texts type="body">{transactionTitle}</Texts>
          <View style={styles.spacing}></View>
          <Texts type="display1">{dateTransaction}</Texts>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingLeft: 27,
    width: 317,
    height: 48,
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
  line: {
    paddingTop: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    opacity: 0.4,
  },
});
