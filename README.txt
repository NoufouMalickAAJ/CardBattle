Card Battle

Jeu de cartes simple en type contre type.

Principe:
- Tu choisis un deck de 3 à 10 cartes.
- Ton deck doit contenir au moins 1 Tranchant, 1 Technique et 1 Contendant.
- L'IA reçoit automatiquement un deck du même nombre de cartes, avec la même contrainte.

Déroulement:
- Dans le combat, tu choisis une carte à jouer.
- L'écran de révélation montre ta carte et celle de l'IA.
- Le tour est résolu avec la règle suivante: Tranchant bat Contendant, Contendant bat Technique, Technique bat Tranchant.
- Si une carte gagne, la carte perdante est retirée du deck.
- En cas d'égalité, les deux cartes sont conservées.
- Si le joueur et l'IA n'ont plus qu'une carte chacun et que ces deux cartes sont du même type, la partie se termine sur un match nul.

But:
- Éliminer toutes les cartes adverses.
- Si les deux derniers personnages ont le même type, le match est nul.

Installation et démarrage:

1. Installe les dépendances:
   npm install --legacy-peer-deps

2. Démarre le projet:
   npm start

3. Une fois le Metro bundler démarré, appuie sur:
   - "i" pour ouvrir sur iOS (simulateur)
   - "a" pour ouvrir sur Android (émulateur)
   - "w" pour ouvrir sur le Web
