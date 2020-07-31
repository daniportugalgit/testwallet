import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

export default function ActionButton({ children, icon, onPress, fillColor='blue', fontColor='white' }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor:fillColor}]}>
        <Feather name={icon} size={24} color={fontColor} />
        <Text style={[styles.text, {color:fontColor}]}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}



