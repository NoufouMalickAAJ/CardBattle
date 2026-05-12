import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { melangerTableau } from '../utils/combatUtils';
import CartePersonnage from '../components/CartePersonnage';
import BoutonPrincipal from '../components/BoutonPrincipal';

export default function CombatScreen({ navigation, route }) {
  const { deckJoueur = [], deckIA = [], dernierResultat = '', finPartie = null } = route.params || {};

  const deckJoueurInitial = useMemo(() => melangerTableau(deckJoueur), [deckJoueur]);
  const deckIAInitial = useMemo(() => melangerTableau(deckIA), [deckIA]);

  const [deckJoueurRestant, setDeckJoueurRestant] = useState(deckJoueurInitial);
  const [deckIARestant, setDeckIARestant] = useState(deckIAInitial);

  const combatTermine = deckJoueurRestant.length === 0 || deckIARestant.length === 0;
  const partieNulle = finPartie === 'nul';

  function terminerPartie() {
    navigation.replace('Accueil');
  }

  const resultatFinal = deckJoueurRestant.length > deckIARestant.length
    ? 'joueur'
    : deckIARestant.length > deckJoueurRestant.length
      ? 'ia'
      : 'egalite';

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>COMBAT</Text>
      <Text style={styles.resume}>
        Ton deck: {deckJoueurRestant.length} cartes | IA: {deckIARestant.length} cartes
      </Text>
      <Text style={styles.regle}>
        Règle: Tranchant bat Contendant, Contendant bat Technique, Technique bat Tranchant.
      </Text>
      {dernierResultat ? (
        <Text style={styles.messageTour}>{dernierResultat}</Text>
      ) : null}

      {!combatTermine && !partieNulle ? (
        <>
          <View style={styles.zone}>
            <Text style={styles.label}>Choisis ta carte à jouer</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {deckJoueurRestant.map(carte => (
                <CartePersonnage
                  key={carte.id}
                  carte={carte}
                  onPress={() => {
                    const indexAleatoire = Math.floor(Math.random() * deckIARestant.length);
                    const carteIASelectionnee = deckIARestant[indexAleatoire];

                    navigation.navigate('RevealTurn', {
                      deckJoueurRestant,
                      deckIARestant,
                      carteJoueurSelectionneeId: carte.id,
                      carteIASelectionneeId: carteIASelectionnee?.id,
                    });
                  }}
                />
              ))}
            </ScrollView>
          </View>

          <Text style={styles.texteVide}>Tape sur une carte pour aller sur l'écran de révélation.</Text>
        </>
      ) : (
        <View style={styles.finWrap}>
          <Text style={styles.finTitre}>
            {partieNulle
              ? 'Match nul'
              : resultatFinal === 'joueur'
              ? 'Tu as gagné!'
              : resultatFinal === 'ia'
                ? 'L\'IA a gagné!'
                : 'Égalité'}
          </Text>
          <Text style={styles.finTexte}>
            {partieNulle ? 'Les deux dernières cartes sont du même type.' : 'La partie est terminée.'}
          </Text>
          {partieNulle ? (
            <View style={styles.zone}>
              {deckJoueurRestant[0] ? <CartePersonnage carte={deckJoueurRestant[0]} /> : null}
              {deckIARestant[0] ? <CartePersonnage carte={deckIARestant[0]} /> : null}
            </View>
          ) : null}
          <BoutonPrincipal
            texte="Retour à l'accueil"
            onPress={terminerPartie}
            couleur="#E74C3C"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    paddingHorizontal: 10,
    paddingTop: 24,
  },
  titre: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  resume: {
    color: '#bbb',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
  },
  regle: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  zone: {
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  messageTour: {
    color: '#FFD700',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  texteVide: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  finWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  finTitre: {
    color: '#FFD700',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  finTexte: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 18,
    textAlign: 'center',
  },
});
