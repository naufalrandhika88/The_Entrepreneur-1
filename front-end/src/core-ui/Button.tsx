import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import Icon from './Icon';
import { BLACK, WHITE, RED, CUSTOM_YELLOW } from '../constants/color';

type Props = {
  newStyleButton?: StyleProp<ViewStyle>;
  newStyleText?: StyleProp<TextStyle>;
  newTextContainer?: StyleProp<ViewStyle>;
  buttonType: 'default' | 'outline' | 'yellow';
  text?: string;
  onPress?: () => void;
};

export default function Button(props: Props) {
  let { newStyleButton, newStyleText, buttonType, text, onPress } = props;

  const _renderDefaultButton = () => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.default, newStyleButton]}
    >
      <View style={styles.container}>
        <Text style={[styles.defaultTextStyle, newStyleText]}>
          {text ? text : 'SIGN UP'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const _renderOutlineButton = () => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.outline, newStyleButton]}
    >
      <View style={styles.customContainer}>
        <Icon
          name={'google'}
          isActive={true}
          customStyle={styles.customIconStyle}
        />
        <Text style={[styles.outlineTextStyle, newStyleText]}>
          Login with Google
        </Text>
      </View>
    </TouchableOpacity>
  );

  const _renderYellowButton = () => (
    <TouchableOpacity onPress={onPress} style={[styles.yellow, newStyleButton]}>
      <View style={styles.container}>
        <Text style={[styles.yellowTextStyle, newStyleText]}>
          {text ? text : 'UPGRADE NOW'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return buttonType === 'default'
    ? _renderDefaultButton()
    : buttonType === 'outline'
    ? _renderOutlineButton()
    : _renderYellowButton();
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  customContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: BLACK,
    height: 40,
    width: '85%',
    marginHorizontal: 24,
    borderRadius: 6,
    justifyContent: 'center',
  },
  defaultTextStyle: {
    color: WHITE,
    fontSize: 16,
  },
  outline: {
    backgroundColor: WHITE,
    borderColor: RED,
    borderWidth: 1,
    height: 36,
    width: '85%',
    marginHorizontal: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineTextStyle: {
    fontSize: 16,
  },
  yellow: {
    backgroundColor: CUSTOM_YELLOW,
    height: 40,
    width: '85%',
    marginHorizontal: 24,
    borderRadius: 6,
    justifyContent: 'center',
  },
  yellowTextStyle: {
    fontSize: 16,
  },
  customIconStyle: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});
