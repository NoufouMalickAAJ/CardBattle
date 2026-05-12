// App.js — Point d'entrée principal de l'application
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import Navigation from './src/Navigation';

export default function App() {
  return (
    // Provider donne accès à la mémoire Redux à toute l'application
    <Provider store={store}>
      {/* NavigationContainer gère toute la navigation entre écrans */}
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
