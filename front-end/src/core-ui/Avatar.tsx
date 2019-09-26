import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'react-native-elements';

type Props = {
  newAvatarStyle?: StyleProp<ViewStyle>;
  src?: string | null;
  sizeAvatar?: 'medium';
};

export default function Avatar(props: Props) {
  let { src, sizeAvatar, newAvatarStyle } = props;

  return src ? (
    <Image
      source={{ uri: src }}
      style={styles[sizeAvatar || 'medium']}
      containerStyle={newAvatarStyle}
    />
  ) : (
    <Image source={require('./assets/images/avatar.png')} />
  );
}

const styles = StyleSheet.create({
  medium: {
    width: 56,
    height: 56,
    borderRadius: 18,
  },
});
