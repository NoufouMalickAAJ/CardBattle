export const TYPES = {
  TRANCHANT: 'tranchant',
  TECHNIQUE: 'technique',
  CONTENDANT: 'contendant',
};

export const TYPE_ADVANTAGE = {
  tranchant: 'contendant',
  contendant: 'technique',
  technique: 'tranchant',
};

export const CHARACTERS = [
  {
    id: 1,
    name: 'Oga',
    type: TYPES.CONTENDANT,
    image: require('../../assets/cards/oga.png'),
  },
  {
    id: 2,
    name: 'Toriko',
    type: TYPES.TECHNIQUE,
    image: require('../../assets/cards/toriko.png'),
  },
  {
    id: 3,
    name: 'Ichigo',
    type: TYPES.TRANCHANT,
    image: require('../../assets/cards/ichigo.png'),
  },
  {
    id: 4,
    name: 'Luffy',
    type: TYPES.CONTENDANT,
    image: require('../../assets/cards/luffy.png'),
  },
  {
    id: 5,
    name: 'Tsuna',
    type: TYPES.CONTENDANT,
    image: require('../../assets/cards/tsuna.png'),
  },
  {
    id: 6,
    name: 'Gintoki',
    type: TYPES.TECHNIQUE,
    image: require('../../assets/cards/gintoki.png'),
  },
  {
    id: 7,
    name: 'Naruto',
    type: TYPES.TECHNIQUE,
    image: require('../../assets/cards/naruto.png'),
  },
  {
    id: 8,
    name: 'Kenshin',
    type: TYPES.TRANCHANT,
    image: require('../../assets/cards/kenshin.png'),
  },
  {
    id: 9,
    name: 'Asta',
    type: TYPES.TRANCHANT,
    image: require('../../assets/cards/asta.png'),
  },
  {
    id: 10,
    name: 'Goku',
    type: TYPES.CONTENDANT,
    image: require('../../assets/cards/goku.png'),
  },
];