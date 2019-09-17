import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Texts from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  forumTitle: ReactNode;
  nameAuthor: ReactNode;
  comment: ReactNode;
};

export default function ForumCard(prop: Props) {
  let { forumTitle, nameAuthor, comment } = prop;

  const styles = StyleSheet.create({
    containerStyle: {
      paddingLeft: 16,
      flex: 1,
      flexDirection: 'row',
      width: 328,
      height: 46,
    },
    iconStyle: {
      width: 32,
      height: 32,
      marginTop: 12,
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
    <View style={styles.containerStyle}>
      <Icon name="forum" customStyle={styles.iconStyle}></Icon>
      <View style={styles.segmentContent}>
        <Texts type="body">{forumTitle}</Texts>
        <View style={styles.spacing}></View>
        <Texts type="display2">{nameAuthor}</Texts>
        <View style={styles.spacing}></View>
        <Texts type="display2">{comment}</Texts>
      </View>
    </View>
  );
}
