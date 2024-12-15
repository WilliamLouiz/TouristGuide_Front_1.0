import { Image, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { Link } from 'expo-router';

export default function Messages() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Tg.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.welcomeText}>Bonjour et soyez le Bienvenue !</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Introduction: TouristGuide</ThemedText>
        <ThemedText>
          L'application TouristGuide est une application disponible sur mobile et web qui permet aux touristes de trouver des <ThemedText type="defaultSemiBold">guides locaux</ThemedText> pour explorer les destinations touristiques de Madagascar.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">But: TouristGuide</ThemedText>
        <ThemedText>
          Le but de l'application est de permettre aux touristes de trouver des guides locaux pour explorer les destinations touristiques de Madagascar,
          de partager leurs expériences et de trouver des informations utiles sur les lieux visités, ainsi que les langues que les guides maitrisent.{'\n'} {'\n'}

          <ThemedText type='default'>On peut aussi reserver des chambres d'hotel et des vols dans notre application.</ThemedText>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Menus:</ThemedText>
        <ThemedText>
          Menus disponibles dans l'application:
        </ThemedText>
        <Collapsible title="Sites">
          <ThemedText>
            Ici vous pouvez voir les sites touristiques de Madagascar et les informations qui leurs sont associés, ainsi que les photos des lieux et les commentaires des utilisateurs.
          </ThemedText>
          <Link href="/(tabs)/sites">
            <ThemedText type="link">Voir les sites</ThemedText>
          </Link>
        </Collapsible>
        <Collapsible title="Guides">
          <ThemedText>
            Ici vous pouvez voir les guides locaux de Madagascar et les informations qui leurs sont associés, ainsi que les langues que les guides maitrisent.
          </ThemedText>
          <Link href="/(tabs)/guides">
            <ThemedText type="link">Voir les guides</ThemedText>
          </Link>
        </Collapsible>
        <Collapsible title="Restaurants">
          <ThemedText>
            Ici vous pouvez voir les restaurants de Madagascar et les informations qui leurs sont associés, ainsi que les photos des lieux.{'\n'}
            Vous pouvez aussi reserver des chambres d'hotel. Touver les chambres disponibles dans les restaurants.
          </ThemedText>
          <Link href="/(tabs)/restaurants">
            <ThemedText type="link">Voir les restaurants</ThemedText>
          </Link>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  welcomeText: {
    lineHeight: 40, // Ajustez cette valeur selon la taille de votre police
    paddingVertical: 5, // Ajoute un espacement vertical
  },
});
