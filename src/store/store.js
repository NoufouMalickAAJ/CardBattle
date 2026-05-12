// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import progressionReducer from './progressionSlice';

const store = configureStore({
  reducer: {
    progression: progressionReducer,
  },
});

export default store;