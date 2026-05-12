import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { determinerVainqueur } from '../utils/combatUtils';
import CartePersonnage from '../components/CartePersonnage';
import BoutonPrincipal from '../components/BoutonPrincipal';

export default function PreviewTurnScreen({ navigation, route }) {
  const {
    deckJoueurRestant = [],
    deckIARestant = [],
    carteJoueurSelectionneeId,
    carteIASelectionneeId,
  } = route.params || {};

  const carteJoueur = useMemo(
    () => deckJoueurRestant.find(carte => carte.id === carteJoueurSelectionneeId) || null,
    [deckJoueurRestant, carteJoueurSelectionneeId],
  );

  const carteIA = useMemo(
    () => deckIARestant.find(carte => carte.id === carteIASelectionneeId) || null,
    [deckIARestant, carteIASelectionneeId],
  );

  const dernierDuelPossible = deckJoueurRestant.length === 1 && deckIARestant.length === 1;
  const memeTypeDerniereCarte = carteJoueur && carteIA && carteJoueur.type === carteIA.type;

  function jouerTour() {
    if (!carteJoueur || !carteIA) {
      Alert.alert('Erreur', 'Impossible de résoudre ce tour.');
      return;
    }

    if (dernierDuelPossible && memeTypeDerniereCarte) {
      navigation.replace('Combat', {
        deckJoueur: deckJoueurRestant,
        deckIA: deckIARestant,
        dernierResultat: 'Match nul: les deux dernières cartes sont du même type.',
        finPartie: 'nul',
      });
      return;
    }

    const resultat = determinerVainqueur(carteJoueur, carteIA);
    let prochainDeckJoueur = [...deckJoueurRestant];
    let prochainDeckIA = [...deckIARestant];
    let message = '';

    if (resultat === 'joueur') {
      prochainDeckIA = deckIARestant.filter(carte => carte.id !== carteIA.id);
      message = `${carteJoueur.name} bat ${carteIA.name}.`;
    } else if (resultat === 'ia') {
      prochainDeckJoueur = deckJoueurRestant.filter(carte => carte.id !== carteJoueur.id);
      message = `${carteIA.name} bat ${carteJoueur.name}.`;
    } else {
      message = 'Égalité: les deux cartes sont conservées.';
    }

    navigation.replace('Combat', {
      deckJoueur: prochainDeckJoueur,
      deckIA: prochainDeckIA,
      dernierResultat: message,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>RÉVÉLATION</Text>
      <Text style={styles.sousTitre}>Voici les deux cartes du tour.</Text>

      <View style={styles.zone}>
        <Text style={styles.label}>Ta carte</Text>
        {carteJoueur ? <CartePersonnage carte={carteJoueur} /> : <Text style={styles.texteVide}>Aucune carte</Text>}
      </View>

      <View style={styles.zone}>
        <Text style={styles.label}>Carte de l'IA</Text>
        {carteIA ? <CartePersonnage carte={carteIA} /> : <Text style={styles.texteVide}>Aucune carte</Text>}
      </View>

      <BoutonPrincipal
        texte="Jouer le tour"
        onPress={jouerTour}
        couleur="#E74C3C"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  titre: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  sousTitre: {
    color: '#bbb',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  zone: {
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  texteVide: {
    color: '#aaa',
    fontSize: 13,
  },
});