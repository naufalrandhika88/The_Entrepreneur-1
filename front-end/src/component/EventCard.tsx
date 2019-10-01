import React, { Key } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Text from '../core-ui/Text';
import Image from '../core-ui/Image';

type Props = {
  key: Key;
  imageURL: string;
  eventTitle: string;
  title: string;
  date: string;
  price: string;
  onClick?: ()=>void
};

export default function EventCard(prop: Props) {
  let { imageURL, eventTitle, title, date, price, onClick } = prop;
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
    <TouchableOpacity onPress={onClick}>
      <View style={styles.containerStyle}>
      <Image
        imagetype="event"
        src={imageURL}
        newImageStyle={styles.imagestyle}
      ></Image>
      <View style={styles.spacing1}></View>
      <Text type="display2">{eventTitle}</Text>
      <View style={styles.spacing2}></View>
      <Text type="display1">{title}</Text>
      <View style={styles.spacing2}></View>
      <Text type="display1">{date}</Text>
      <View style={styles.spacing2}></View>
      <Text color="yellow">{price}</Text>
    </View>
    </TouchableOpacity>
  );
}
