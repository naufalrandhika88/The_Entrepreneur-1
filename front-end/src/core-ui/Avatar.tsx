import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'react-native-elements';

type Props = {
  newAvatarStyle?: StyleProp<ViewStyle>;
  src?: string | null;
  sAvatar?: 'medium';
};

export default function Avatar(props: Props) {
  let { src, sAvatar, newAvatarStyle } = props;
  return src ? (
    <Image
      source={{ uri: src }}
      style={styles[sAvatar || 'medium']}
      containerStyle={newAvatarStyle}
    />
  ) : (
    <Image source={require('./assets/images/fotoProfile.png')} />
  );
}
const styles = StyleSheet.create({
  medium: {
    width: 56,
    height: 56,
    borderRadius: 18,
  },
});
