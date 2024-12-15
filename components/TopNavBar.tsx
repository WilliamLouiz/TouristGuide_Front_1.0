import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TopNavBar() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconContainer}>
        <MaterialIcons name="message" size={24} color="black" />
      </Pressable>
      
      <Pressable style={styles.iconContainer}>
        <MaterialIcons name="notifications" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    marginLeft: 20,
    padding: 5,
  },
});