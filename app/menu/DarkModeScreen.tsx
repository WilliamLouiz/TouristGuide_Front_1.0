// TouristGuide/app/(tabs)/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DarkModeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mode Sombre</Text>
      <Text style={styles.content}>Bienvenue sur votre mode sombre !</Text>
      {/* Ajoutez plus de contenu ici selon vos besoins */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },
});