import React, { Key } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Texts from '../core-ui/Text';
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
        src={{uri: imageURL}}
        newImageStyle={styles.imagestyle}
      ></Image>
      <View style={styles.spacing1}></View>
      <Texts type="display2">{eventTitle}</Texts>
      <View style={styles.spacing2}></View>
      <Texts type="display1">{title}</Texts>
      <View style={styles.spacing2}></View>
      <Texts type="display1">{date}</Texts>
      <View style={styles.spacing2}></View>
      <Texts color="yellow">{price}</Texts>
    </View>
    </TouchableOpacity>
  );
}
