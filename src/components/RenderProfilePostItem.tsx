import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RenderProfilePostItem = ({ item, onPress }) => (
  <TouchableOpacity style={{flex: 1, padding: 5}} onPress={onPress}>
    <ImageBackground
      style={styles.postItem}
      source={{uri: item.photo}}
    />
  </TouchableOpacity>
)

export default RenderProfilePostItem

const styles = StyleSheet.create({

  postItem: {
    flex: 1,
    aspectRatio: 1.0,
  },
})