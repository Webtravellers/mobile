import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types/CityModel';

const ApiSlice = createSlice({
  name: 'api',
  initialState: {
    fetch: [] as string[],
  },
  reducers: {
    addFetch: (state, action: PayloadAction<string>) => {
        state.fetch = [...state.fetch, action.payload];
    },
    removeFetch: (state, action: PayloadAction<string>) => {
        state.fetch = state.fetch.filter(fetch => fetch !== action.payload);
        }
  },
});

export const {addFetch, removeFetch} = ApiSlice.actions;
export default ApiSlice.reducer;

export enum FETCH_REQUESTS {
    TRIP_DETAIL = 'TRIP_DETAIL',
} 
