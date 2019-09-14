import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Texts from '../core-ui/Text';
import Image from '../core-ui/Image';

type Props = {
  imageChildren: ReactNode;
  eventTitle: ReactNode;
  title: ReactNode;
  date: ReactNode;
  price: ReactNode;
};

export default function EventCard(prop: Props) {
  let { imageChildren, eventTitle, title, date, price } = prop;
  const styles = StyleSheet.create({
    containerStyle: {
      width: 120,
      height: 56,
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
    <View style={styles.containerStyle}>
      <Image
        imagetype="event"
        src={imageChildren}
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
  );
}
