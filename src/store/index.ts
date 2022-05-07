import { configureStore } from '@reduxjs/toolkit';
import locations from './locations';
import user from './user';

export const store = configureStore({
  reducer: {
    user: user,
    locations: locations
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;