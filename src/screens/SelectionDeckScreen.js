import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { CHARACTERS } from '../data/characters';
import CartePersonnage from '../components/CartePersonnage';
import BoutonPrincipal from '../components/BoutonPrincipal';
import {
  construireDeckAleatoireEquilibre,
  deckContientTousLesTypes,
  melangerTableau,
} from '../utils/combatUtils';

const MIN_CARTES = 3;
const MAX_CARTES = 10;

export default function SelectionDeckScreen({ navigation }) {
  const [nbCartes, setNbCartes] = useState(MIN_CARTES);
  const [cartesSelectionnees, setCartesSelectionnees] = useState([]);

  const deckValide = useMemo(
    () => deckContientTousLesTypes(cartesSelectionnees) && cartesSelectionnees.length === nbCartes,
    [cartesSelectionnees, nbCartes],
  );

  function selectionnerCarte(carte) {
    setCartesSelectionnees(precedent => {
      const dejaSelectionnee = precedent.some(carteSelectionnee => carteSelectionnee.id === carte.id);

      if (dejaSelectionnee) {
        return precedent.filter(carteSelectionnee => carteSelectionnee.id !== carte.id);
      }

      if (precedent.length >= nbCartes) {
        Alert.alert('Deck plein', `Sélectionne exactement ${nbCartes} cartes.`);
        return precedent;
      }

      return [...precedent, carte];
    });
  }

  function lancerCombat() {
    if (cartesSelectionnees.length !== nbCartes) {
      Alert.alert('Deck incomplet', `Choisis exactement ${nbCartes} cartes.`);
      return;
    }

    if (!deckContientTousLesTypes(cartesSelectionnees)) {
      Alert.alert('Deck invalide', 'Ton deck doit contenir au moins 1 Tranchant, 1 Technique et 1 Contendant.');
      return;
    }

    const deckJoueur = melangerTableau(cartesSelectionnees);
    const deckIA = construireDeckAleatoireEquilibre(nbCartes, CHARACTERS);

    navigation.navigate('Combat', {
      deckJoueur,
      deckIA,
      nbCartes,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titre}>Ton Deck</Text>
      <Text style={styles.sousTitre}>Choisis entre 3 et 10 cartes, avec au moins 1 carte de chaque type.</Text>

      <Text style={styles.label}>Taille du deck :</Text>
      <View style={styles.ligne}>
        {Array.from({ length: MAX_CARTES - MIN_CARTES + 1 }, (_, index) => index + MIN_CARTES).map(n => (
          <BoutonPrincipal
            key={n}
            texte={`${n}`}
            onPress={() => {
              setNbCartes(n);
              setCartesSelectionnees([]);
            }}
            couleur={nbCartes === n ? '#E74C3C' : '#333'}
          />
        ))}
      </View>

      <Text style={styles.resume}>
        Sélection: {cartesSelectionnees.length}/{nbCartes}
      </Text>

      <View style={styles.blocTypes}>
        <Text style={styles.typeLigne}>Tranchant: {cartesSelectionnees.filter(carte => carte.type === 'tranchant').length}</Text>
        <Text style={styles.typeLigne}>Technique: {cartesSelectionnees.filter(carte => carte.type === 'technique').length}</Text>
        <Text style={styles.typeLigne}>Contendant: {cartesSelectionnees.filter(carte => carte.type === 'contendant').length}</Text>
      </View>

      <FlatList
        data={CHARACTERS}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const estSelectionnee = cartesSelectionnees.some(carte => carte.id === item.id);

          return (
            <CartePersonnage
              carte={item}
              estSelectionnee={estSelectionnee}
              onPress={() => selectionnerCarte(item)}
            />
          );
        }}
      />

      <BoutonPrincipal
        texte="Commencer"
        onPress={lancerCombat}
        couleur="#E74C3C"
        disabled={!deckValide}
      />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d1a', padding: 10 },
  titre: { color: '#FFD700', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 36, marginBottom: 8 },
  sousTitre: { color: '#bbb', fontSize: 13, textAlign: 'center', marginBottom: 10 },
  label: { color: '#fff', fontSize: 14, marginTop: 10, marginBottom: 6 },
  resume: { color: '#fff', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  blocTypes: {
    marginTop: 4,
    marginBottom: 10,
    backgroundColor: '#141428',
    borderRadius: 12,
    padding: 12,
  },
  typeLigne: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 4,
  },
  deckSelectionne: {
    color: '#FFD700',
  },
});