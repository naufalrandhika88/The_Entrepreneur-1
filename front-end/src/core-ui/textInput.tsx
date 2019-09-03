import React, { Component } from 'react';
import { Text, View, TextInput, AppRegistry } from 'react-native';

export default class TextHandling extends Component {
  constructor() {
    super();
    this.state = { text: '' };
  }

  render() {
    return (
      <View>
        <Text>input text here</Text>
        <TextInput
          onChangeText={(input_text) => {
            this.setState({ asal: input_text });
          }}
        />
        <Text>text {this.state.text}</Text>
      </View>
    );
  }
}
AppRegistry.registerComponent('Handling', () => TextHandling);
