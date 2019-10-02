import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import { VerticalSpacer1 } from '../core-ui/Spacer';

type Props = {
  titleInbox: ReactNode;
  dateInbox: ReactNode;
};

export default function InboxCard(prop: Props) {
  let { titleInbox, dateInbox } = prop;

  return (
    <View>
      <View style={styles.containerStyle}>
        <Text type="display2" style={styles.dateinbox}>
          {dateInbox}
        </Text>
        <View style={styles.spacing}></View>
        <Text type="body">{titleInbox}</Text>
      </View>
      <VerticalSpacer1 />
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    paddingTop: 24,
    paddingLeft: 16,
    height: 42,
  },
  spacing: {
    height: 4,
  },
  line: {
    paddingTop: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    opacity: 0.4,
  },
  dateinbox: {
    opacity: 0.5,
  },
});
