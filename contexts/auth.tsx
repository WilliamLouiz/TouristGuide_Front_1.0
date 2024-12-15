import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Redirect } from 'expo-router';

interface AuthContextType {
    user: { token: string } | null; // Ajout de `null` pour éviter les erreurs
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: async () => {},
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [loading, setLoading] = useState(true);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/auth/login/', { username, password });
            const { access } = response.data;
            await AsyncStorage.setItem('authToken', access);
            setUser({ token: access });
        } catch (error) {
            console.error('Erreur de connexion :', error);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('authToken');
        setUser(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                console.log('Token récupéré :', token); // Log le token récupéré
                if (token == null) {
                    return <Redirect href="/auth/login" />;
                }
                else if (token) {
                    const response = await axios.post('http://127.0.0.1:8000/auth/verify/', { token });
                    console.log('Réponse de validation :', response.data); 
                    if (response.data.valid) {
                        setUser({ token });
                    } else {
                        await AsyncStorage.removeItem('authToken');
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la validation du token :', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
