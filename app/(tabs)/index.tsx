import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/contexts/auth';
import { Redirect } from 'expo-router';

const data = [
  { id: '1', title: 'Baobab', image: require('@/assets/images/maki.jpg'), likes: 25, comments: 12, description: 'Un arbre majestueux.' },
  { id: '2', title: 'Lémurien', image: require('@/assets/images/murien.jpg'), likes: 30, comments: 15, description: 'Un animal endémique de Madagascar.' },
  { id: '3', title: 'Lémurien', image: require('@/assets/images/mu.jpg'), likes: 30, comments: 15, description: 'Un animal endémique de Madagascar.' },
  { id: '4', title: 'Lémurien que j ai vu quelquepart à madagascar', image: require('@/assets/images/OIP.jpg'), likes: 30, comments: 15, description: 'Un animal endémique de Madagascar.' },
  { id: '5', title: 'Lémurien', image: require('@/assets/images/R.jpg'), likes: 30, comments: 15, description: 'Un animal endémique de Madagascar.' },
  { id: '6', title: 'Lémurien', image: require('@/assets/images/m.jpg'), likes: 30, comments: 15, description: 'Un animal endémique de Madagascar.' },
];

function HomeScreen() {
  const { user, loading } = useAuth();

  // Si l'application est en train de charger, afficher un indicateur de chargement
  if (loading) {
    return <Text>Chargement...</Text>;
  }
  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/Tg.png')} style={styles.logo} />
          <Text style={styles.appName}>Tourist Guide</Text>
        </View>
        <View style={styles.separator} />
        <TextInput style={styles.searchInput} placeholder="rechercher ici..." />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.cardFooter}>
                <FontAwesome name="thumbs-up" size={16} color="gray" />
                <Text>{item.likes}</Text>
                <FontAwesome name="comment" size={16} color="gray" />
                <Text>{item.comments}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
  else {
    return <Redirect href="/auth/login" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  separator: {
    height: 1,
    backgroundColor: '#dcdcdc',
    marginVertical: 10,
    width: '100%',
  },
  searchInput: {
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 0,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 5,
  },
});

export default HomeScreen;