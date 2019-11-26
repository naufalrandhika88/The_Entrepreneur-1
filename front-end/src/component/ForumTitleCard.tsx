import React, { ReactNode, Key } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ForumData } from '../model/forum';
import Image from '../core-ui/Image';
import { k8, k16, k24, k32 } from '../constants/dimens';
import { VerticalSpacer1, HorizontalSpacer1, HorizontalSpacer3 } from '../core-ui/Spacer';

type Props = {
  key: Key;
  data: ForumData;
  onPress?: ()=>void
};

export default function ForumTitleCard(prop: Props) {
  let {onPress, data} = prop;  

  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      padding: k16,
      flexDirection: 'row',
      alignItems: "center"
    },
    iconStyle: {
      width: k32,
      height: k32,
    },
    pictureStyle: {
      width: k32,
      height: k32,
      overflow: 'hidden'
    },
    segmentContent: {
      flexDirection: 'column',
      flex:1
    },
  });

  return (
    <TouchableOpacity onPress={(onPress)} style={styles.containerStyle}>
      {
        data.image != null ? <Image src={data.image[0]} newImageStyle={styles.pictureStyle}></Image> :
        <Icon name="forum" customStyle={styles.iconStyle}></Icon>
      }
      <HorizontalSpacer3></HorizontalSpacer3>
      <View style={styles.segmentContent}>
        <Text color="gray2" type="display1">{data.cdate}</Text>
        <VerticalSpacer1></VerticalSpacer1>
        <Text color="gray3" type="body">{data.forum_name}</Text>
        <VerticalSpacer1></VerticalSpacer1>
        <Text color="gray" type="display1">{"Likes: "+data.likes}</Text>
      </View>
    </TouchableOpacity>
  );
}
