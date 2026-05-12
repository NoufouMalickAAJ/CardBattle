import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BoutonPrincipal from '../components/BoutonPrincipal';

export default function AccueilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>CARD BATTLE</Text>
      <Text style={styles.sousTitre}>Pierre-Feuille-Ciseau avec des cartes</Text>
      <BoutonPrincipal
        texte="Jouer"
        onPress={() => navigation.navigate('SelectionDeck')}
        couleur="#E74C3C"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titre: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 4,
    marginBottom: 8,
  },
  sousTitre: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 40,
  },
  record: {
    color: '#FFD700',
    marginTop: 20,
    fontSize: 13,
  },
});