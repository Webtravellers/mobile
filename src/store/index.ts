import { configureStore } from '@reduxjs/toolkit';
import cities from './cities';
import locations from './locations';
import user from './user';

export const store = configureStore({
  reducer: {
    user: user,
    locations: locations,
    cities: cities,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;