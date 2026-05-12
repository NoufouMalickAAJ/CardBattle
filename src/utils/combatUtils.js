import { CHARACTERS, TYPE_ADVANTAGE, TYPES } from '../data/characters';

export const TYPES_DECK = [
  TYPES.TRANCHANT,
  TYPES.TECHNIQUE,
  TYPES.CONTENDANT,
];

export function melangerTableau(items) {
  const copie = [...items];

  for (let index = copie.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copie[index], copie[randomIndex]] = [copie[randomIndex], copie[index]];
  }

  return copie;
}

export function construireDeckUnDeChaqueType(carteSource = CHARACTERS, idsExclus = []) {
  return TYPES_DECK.map(type => {
    const cartesDuType = carteSource.filter(carte => carte.type === type && !idsExclus.includes(carte.id));
    const cartesCompatibles = cartesDuType.length > 0
      ? cartesDuType
      : carteSource.filter(carte => carte.type === type);

    return melangerTableau(cartesCompatibles)[0];
  }).filter(Boolean);
}

export function construireDeckAleatoireEquilibre(nombreCartes, carteSource = CHARACTERS) {
  const deck = [];
  const cartesDisponibles = [...carteSource];

  TYPES_DECK.forEach(type => {
    const cartesDuType = cartesDisponibles.filter(carte => carte.type === type);
    if (cartesDuType.length === 0) {
      return;
    }

    const carteChoisie = melangerTableau(cartesDuType)[0];
    deck.push(carteChoisie);

    const indexCarte = cartesDisponibles.findIndex(carte => carte.id === carteChoisie.id);
    if (indexCarte >= 0) {
      cartesDisponibles.splice(indexCarte, 1);
    }
  });

  const resteMelange = melangerTableau(cartesDisponibles);
  while (deck.length < nombreCartes && resteMelange.length > 0) {
    deck.push(resteMelange.shift());
  }

  return melangerTableau(deck).slice(0, nombreCartes);
}

export function deckContientTousLesTypes(deck = []) {
  return TYPES_DECK.every(type => deck.some(carte => carte.type === type));
}

export function hasAdvantage(typeAttaquant, typeDefenseur) {
  return TYPE_ADVANTAGE[typeAttaquant] === typeDefenseur;
}

export function determinerVainqueur(carteJoueur, carteIA) {
  const joueurGagne = hasAdvantage(carteJoueur.type, carteIA.type);
  const iaGagne = hasAdvantage(carteIA.type, carteJoueur.type);
  
  if (joueurGagne && !iaGagne) return 'joueur';
  if (iaGagne && !joueurGagne) return 'ia';
  return 'egalite';
}