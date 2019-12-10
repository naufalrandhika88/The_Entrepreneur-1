import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';

import { Image as Picture } from 'react-native-elements';

type Props = {
  newImageStyle?: StyleProp<ViewStyle>;
  src?: String;
  imagetype?: 'banner' | 'logo' | 'minilogo' | 'forum' | 'event' | 'seminar';
  resizeMode?: 'center' | 'contain' | 'stretch' | 'cover' | 'repeat';
};

const placeholder = require('../../assets/images/placeholder.png');

export default function Image(props: Props) {
  let { src, imagetype, newImageStyle, resizeMode } = props;
  let source;

  if(src == null) source = placeholder
  else source = {uri: src}
  
  return (
    <Picture
      source={source}
      style={styles[imagetype || 'logo']}
      containerStyle={newImageStyle}
      resizeMode={resizeMode ? resizeMode : 'center'}
    />
  );
}

const styles = StyleSheet.create({
  banner: {
    alignSelf: 'stretch',
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
