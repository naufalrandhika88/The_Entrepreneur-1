import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';

import { Image as Picture } from 'react-native-elements';

type Props = {
  src?: string;
  imagetype?: 'banner' | 'logo' | 'minilogo' | 'forum' | 'event' | 'seminar';
};

const IMAGE = {
  logo: require('../../assets/images/logo.png'),
};

export default function Image(props: Props) {
  let { src, imagetype } = props;

  return src ? (
    <Picture source={{ uri: src }} style={styles[imagetype || 'logo']} />
  ) : (
    <View> </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: 324,
    height: 100,
  },
  logo: {
    width: 152,
    height: 160,
  },
  minilogo: {
    width: 46,
    height: 48,
  },
  forum: {
    width: 54,
    height: 54,
    borderRadius: 4,
  },
  event: {
    width: 120,
    height: 56,
    borderRadius: 4,
  },
  seminar: {
    width: 360,
    height: 240,
  },
});
