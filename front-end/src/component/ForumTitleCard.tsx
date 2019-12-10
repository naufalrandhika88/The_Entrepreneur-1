import React, { Key } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ForumData } from '../model/forum';
import Image from '../core-ui/Image';
import { k16, k32 } from '../constants/dimens';
import { HorizontalSpacer3 } from '../core-ui/Spacer';
import { month_names } from '../constants/data';

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
      alignItems: "center",
      minHeight: k32*2,
    },
    iconStyle: {
      width: k32,
      height: k32,
    },
    segmentContent: {
      flexDirection: 'column',
      flex:1
    },
  });

  var cDate = new Date(data.cdate)

  return (
    <TouchableOpacity onPress={(onPress)} style={styles.containerStyle}>
      {
        data.image != null ? <Image imagetype="forum" resizeMode="cover"  src={data.image}></Image> :
        <Icon name="forum" customStyle={styles.iconStyle}></Icon>
      }
      <HorizontalSpacer3></HorizontalSpacer3>
      <View style={styles.segmentContent}>
        <Text color="gray3" type="display1">{cDate.getDay()+' '+month_names[cDate.getMonth()]+' '+cDate.getFullYear()}</Text>
        <Text color="gray4" type="subheading">{data.forum_name}</Text>
        <Text color="gray2" type="display2">{"Likes: "+data.likes}</Text>
      </View>
    </TouchableOpacity>
  );
}
