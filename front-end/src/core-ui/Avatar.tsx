import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {Image} from 'react-native-elements';

import Icon from './Icon';
import {WHITE} from '../constants/color';

type Props = {
  newAvatarStyle?: StyleProp<ViewStyle>;
  src?: string | null;
  sizeAvatar?: 'small' | 'medium' | 'large';
  typeLocation?: boolean;
};

let size = {
  small: 14,
  medium: 26,
  large: 90,
};

export default function Avatar(props: Props) {
  let {src, sizeAvatar, typeLocation, newAvatarStyle} = props;

  return src ? (
    <Image
      source={{uri: src}}
      style={styles[sizeAvatar || 'medium']}
      containerStyle={newAvatarStyle}
    />
  ) : (
    <View style={[styles[sizeAvatar || 'medium'], newAvatarStyle]}>
      <Icon
        nameIcon={typeLocation ? 'location-pin' : 'user'}
        typeIcon={typeLocation ? 'entypo' : 'antdesign'}
        colorIcon={WHITE}
        sizeIcon={size[sizeAvatar || 'medium']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  small: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC12E',
  },
  medium: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFC12E',
  },
  large: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFC12E',
  },
});
