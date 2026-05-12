// src/Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccueilScreen from './screens/AccueilScreen';
import SelectionDeckScreen from './screens/SelectionDeckScreen';
import CombatScreen from './screens/CombatScreen';
import PreviewTurnScreen from './screens/PreviewTurnScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Accueil"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Accueil" component={AccueilScreen} />
      <Stack.Screen name="SelectionDeck" component={SelectionDeckScreen} />
      <Stack.Screen name="RevealTurn" component={PreviewTurnScreen} />
      <Stack.Screen name="Combat" component={CombatScreen} />
    </Stack.Navigator>
  );
}