import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types/CityModel';

const citySlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [] as City[],
  },
  reducers: {
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    }
  },
});

export const {setCities} = citySlice.actions;

export default citySlice.reducer;