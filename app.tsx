// Exemple de fichier App.tsx ou le fichier principal de votre application

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabLayout from './app/(tabs)/_layout'; // Ou tout autre chemin correct

export default function App() {
  return (
    <NavigationContainer>
      <TabLayout /> {/* Placez votre navigation ici */}
    </NavigationContainer>
  );
}
