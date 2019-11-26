import React, { ReactNode } from 'react';
import { Text as T, TextProps, StyleSheet, TouchableOpacity } from 'react-native';

import {
  CUSTOM_BLACK,
  CUSTOM_YELLOW,
  CUSTOM_GREEN,
  CUSTOM_RED,
  CUSTOM_PINK,
  CUSTOM_BROWN,
  GRAY,
  GRAY2,
  GRAY3,
  GRAY4,
  WHITE,
} from '../constants/color';

type TextProp = TextProps & {
  children: ReactNode;
  type?: 'display2' | 'display1' | 'headline' | 'subheading' | 'body';
  color?: 'black' | 'yellow' | 'green' | 'red' | 'pink' | 'brown' | 'gray' | 'gray2' | 'gray3' | 'gray4' | 'white';
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
  brown: CUSTOM_BROWN,
  gray: GRAY,
  gray2: GRAY2,
  gray3: GRAY3,
  gray4: GRAY4,
  white: WHITE,
};

export default function Text(props: TextProp) {
  let { type, color, size, weight, style, onPress, children, ...other } = props;

  let fontWeight = FONT_WEIGHT[weight || 'regular'];
  let fontSize = size ? size : 12;
  let textColor = FONT_COLOR[color || 'black'];

  let textStyle = { fontWeight, fontSize, color: textColor };

  let mixedStyles = [textStyle, type && styles[type], style && style];

  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <T style={mixedStyles} {...other}>
        {children}
      </T>
    </TouchableOpacity>
  ) : (
    <T style={mixedStyles} {...other}>
      {children}
    </T>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  display1: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  display2: {
    fontSize: 10,
    fontWeight: 'normal',
  },
});
