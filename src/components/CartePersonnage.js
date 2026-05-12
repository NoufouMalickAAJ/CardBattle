// src/components/CartePersonnage.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Couleurs associées à chaque type
const COULEUR_TYPE = {
  tranchant: '#E74C3C',   // rouge
  technique: '#3498DB',   // bleu
  contendant: '#2ECC71',  // vert
};

// Le composant reçoit ces informations en "props" (paramètres) :
// carte       : les données du personnage
// estSelectionnee : true si la carte est actuellement sur le terrain
// onPress     : que faire quand on appuie dessus
// disabled    : true si on ne peut pas interagir avec la carte
export default function CartePersonnage({ carte, estSelectionnee, onPress, disabled }) {
  if (!carte) return null;

  const couleur = COULEUR_TYPE[carte.type] || '#888';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.carte, estSelectionnee && styles.carteSelectionnee, { borderColor: couleur }]}
    >
      <Image source={carte.image} style={styles.image} resizeMode="contain" />

      <View style={[styles.bandeau, { backgroundColor: couleur }]}>
        <Text style={styles.nomType}>{carte.type.toUpperCase()}</Text>
      </View>

      <Text style={styles.nom}>{carte.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  carte: {
    width: 140,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 2,
    margin: 6,
    overflow: 'hidden',
    alignItems: 'center',
  },
  carteSelectionnee: {
    borderWidth: 4,
    shadowColor: '#FFD700',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#111',
  },
  bandeau: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  nomType: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  nom: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 6,
  },
});