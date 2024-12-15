import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    
    const handleLogin = async () => {
        try {
            console.log('Tentative de connexion...'); // Pour le débogage
            setIsLoading(true);
            const response = await fetch('http://192.168.88.50:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            console.log('Status:', response.status); // Pour le débogage
            const data = await response.json();
            console.log('Réponse de l\'API:', data); // Affiche la réponse complète pour débogage

            if (response.ok) {
                if (data.token) {
                    console.log('Token trouvé:', data.token); // Vérifiez que le token est bien trouvé
                    await AsyncStorage.setItem('userToken', data.token);
                    Alert.alert('Succès', 'Connexion réussie');
                    router.replace('/(tabs)');
                } else {
                    console.error('Erreur : Token manquant dans la réponse');
                    Alert.alert('Erreur', 'Token manquant');
                }
            } else {
                Alert.alert("Erreur de connexion", data.message || "Une erreur est survenue");
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            Alert.alert(
                "Erreur",
                "Impossible de se connecter au serveur"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
             <View style={styles.imageContainer}>
                <Image
                    source={require('@/assets/images/Tg.png')} // Assurez-vous que le chemin est correct
                    style={styles.image}
                />
            </View>
            <ThemedText style={styles.title}>Bienvenue à Madagascar</ThemedText>
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <ThemedText style={styles.buttonText}>
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      image: {
        width: 100, // Taille du cercle
        height: 100, // Taille du cercle
        borderRadius: 50, // Moitié de la taille pour un cercle
      },
    title: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00bf63',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
});