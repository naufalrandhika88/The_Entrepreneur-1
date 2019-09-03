import React, { ReactNode } from 'react';
import { Text, TextProps, StyleSheet, TouchableOpacity } from 'react-native';

import {
  CUSTOM_BLACK,
  CUSTOM_YELLOW,
  CUSTOM_GREEN,
  CUSTOM_RED,
  CUSTOM_PINK,
} from '../constants/color';

type TextProp = TextProps & {
  children: ReactNode;
  type?: 'display2' | 'display1' | 'headline' | 'subheading' | 'body';
  color?: 'black' | 'yellow' | 'green' | 'red' | 'pink';
  size?: number;
  weight?: 'regular' | 'bold';
  onPress?: () => void;
};

const FONT_WEIGHT: any = {
  regular: 'normal',
  bold: 'bold',
};

const FONT_COLOR: any = {
  black: CUSTOM_BLACK,
  yellow: CUSTOM_YELLOW,
  green: CUSTOM_GREEN,
  red: CUSTOM_RED,
  pink: CUSTOM_PINK,
};

export default function Texts(props: TextProp) {
  let { type, color, size, weight, style, onPress, children, ...other } = props;

  let fontWeight = FONT_WEIGHT[weight || 'regular'];
  let fontSize = size ? size : 12;
  let textColor = FONT_COLOR[color || 'black'];

  let textStyle = { fontWeight, fontSize, color: textColor };

  let mixedStyles = [textStyle, type && styles[type], style && style];

  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <Text style={mixedStyles} {...other}>
        {children}
      </Text>
    </TouchableOpacity>
  ) : (
    <Text style={mixedStyles} {...other}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 18,
    color: CUSTOM_BLACK,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 16,
    color: CUSTOM_BLACK,
    fontWeight: 'normal',
  },
  body: {
    fontSize: 14,
    color: CUSTOM_BLACK,
    fontWeight: 'normal',
  },
  display1: {
    fontSize: 12,
    color: CUSTOM_BLACK,
    fontWeight: 'normal',
  },
  display2: {
    fontSize: 10,
    color: CUSTOM_BLACK,
    fontWeight: 'normal',
  },
});
