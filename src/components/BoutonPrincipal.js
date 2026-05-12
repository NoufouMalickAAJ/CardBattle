// src/components/BoutonPrincipal.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BoutonPrincipal({ texte, onPress, couleur, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.bouton, { backgroundColor: disabled ? '#555' : (couleur || '#E74C3C') }]}
    >
      <Text style={styles.texte}>{texte}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bouton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  texte: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});