import React from 'react';
import {StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon, { IconName } from '../core-ui/Icon';
import Text from '../core-ui/Text';

type Props={
  name: IconName;
  text: string;
  onPress?: ()=>void;
}

export default function TextIcon(props: Props) {
  let {name, text, onPress} = props
    return (
      <View style={styles.content}>
        <TouchableOpacity onPress={onPress}>
         <Icon name={name}></Icon>
         <Text type="body">{text}</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
  }
})


