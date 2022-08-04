import { configureStore } from '@reduxjs/toolkit';
import api from './api';
import cities from './cities';
import locations from './locations';
import user from './user';

export const store = configureStore({
  reducer: {
    user: user,
    locations: locations,
    cities: cities,
    api: api
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;