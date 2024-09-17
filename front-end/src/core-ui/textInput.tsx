import React, { Fragment } from 'react';
import {
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Input } from 'react-native-elements';

import { BLACK } from '../constants/color';

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label?: string;
  value?: string;
  placeholder?: string;
  placeholderTextColor?: 'white' | 'black';
  isEncrypt?: boolean;
  onChangeText?: (text: string) => void;
};

export default function TextInput(props: Props) {
  let {
    containerStyle,
    inputContainerStyle,
    inputStyle,
    labelStyle,
    label,
    value,
    placeholder,
    placeholderTextColor,
    isEncrypt,
    onChangeText,
    ...otherProps
  } = props;

  return (
    <Fragment>
      <Input
        containerStyle={containerStyle}
        inputContainerStyle={[
          styles.defaultInputContainerStyle,
          inputContainerStyle,
        ]}
        inputStyle={[styles.defaultTextStyle, inputStyle]}
        labelStyle={[styles.defaultLabelStyle, labelStyle]}
        label={label}
        value={value}
        placeholder={placeholder || label}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : BLACK
        }
        onChangeText={onChangeText}
        secureTextEntry={isEncrypt === true}
        autoCapitalize={
          isEncrypt === true ||
          label === 'Email Address' ||
          label === 'Caption' ||
          label === 'Username' ||
          placeholder === 'Search'
            ? 'none'
            : 'words'
        }
        {...otherProps}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  defaultInputContainerStyle: {
    alignSelf: 'stretch',
    borderBottomWidth: 0,
  },
  defaultLabelStyle: {
    color: BLACK,
    fontSize: 12,
  },
  defaultTextStyle: {
    color: BLACK,
    fontSize: 14,
  },
});
