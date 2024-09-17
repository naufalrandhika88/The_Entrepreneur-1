import React, { Key } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Text from '../core-ui/Text';
import Image from '../core-ui/Image';
import {Event} from '../model/event';
import { k16 } from '../constants/dimens';

type Props = {
  data: Event
  key: Key
  onClick?: ()=>void
};

export default function EventCard(prop: Props) {
  let { data, onClick } = prop;
  const styles = StyleSheet.create({
    containerStyle: {
      width: 120,
    },
    spacing1: {
      height: 8,
    },
    spacing2: {
      height: 4,
    },
    imagestyle: {},
  });

  return (
    <TouchableOpacity onPress={onClick} style={{paddingRight: k16}}>
      <View style={styles.containerStyle}>
      <Image
        imagetype="event"
        resizeMode="cover"
        src={data.image}
        newImageStyle={styles.imagestyle}
      ></Image>
      <View style={styles.spacing1}></View>
      <Text type="display2">{data.category}</Text>
      <View style={styles.spacing2}></View>
      <Text type="display1">{data.event_name}</Text>
      <View style={styles.spacing2}></View>
      <Text type="display1">{data.event_date}</Text>
      <View style={styles.spacing2}></View>
      <Text color="yellow">{'Rp'+data.price}</Text>
    </View>
    </TouchableOpacity>
  );
}
