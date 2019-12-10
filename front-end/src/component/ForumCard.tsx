import React, { ReactNode, Key } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  key: Key;
  forumTitle: ReactNode;
  nameAuthor: ReactNode;
  comment: ReactNode;
  onPress?:()=>void;
};

export default function ForumCard(prop: Props) {
  let { forumTitle, nameAuthor, comment,onPress } = prop;

  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: 'row',
      paddingBottom: 16,
      alignItems: "center"
    },
    iconStyle: {
      width: 32,
      height: 32,
    },
    spacing: {
      height: 4,
    },
    segment: {
      flexDirection: 'row',
    },
    segmentContent: {
      flexDirection: 'column',
      width: 284,
      height: 46,
      paddingLeft: 12,
    },
    maxWidth: {
      flex: 1,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
      <Icon name="forum"></Icon>
      <View style={styles.segmentContent}>
        <Text color="gray3" type="body">{forumTitle}</Text>
        <View style={styles.spacing}></View>
        <Text color="gray2" type="display2">{nameAuthor}</Text>
        <View style={styles.spacing}></View>
        <Text color="gray" type="display2">{comment}</Text>
      </View>
    </TouchableOpacity>
  );
}
