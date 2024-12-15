    // TouristGuide/app/auth/LogoutScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez le token d'authentification si nécessaire
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Supprimez le token d'authentification
        await AsyncStorage.removeItem('authToken');
        Alert.alert('Déconnexion réussie');
        // Redirigez vers l'écran de connexion
        navigation.navigate('login'); // Assurez-vous que 'Login' est un écran valide
      } else {
        Alert.alert('Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur de connexion au serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Déconnexion</Text>
      <Button title="Se déconnecter" onPress={handleLogout} />
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
    marginBottom: 20,
  },
});