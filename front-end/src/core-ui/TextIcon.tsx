import React, { Component } from 'react';
import { StyleSheet, Alert, View, Image, TouchableOpacity } from 'react-native';

export default class TextIcon extends Component {
  imagePressed() {
    Alert.alert('image pressed');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.imagePressed()}>
          <Image
            style={{ height: 200, width: 200 }}
            source={require('./assets/images/forum.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
