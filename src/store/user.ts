import { UserModel } from './../types/userModel';
import Location from './../types/LocationModel';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: <UserModel | null>{},
    favoriteList: <Location[] | null>[]
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
      state.favoriteList = action.payload?.favoritesList ?? [];
    },
    setFavoriteList: (state, action: PayloadAction<Location[]>) => {
      state.favoriteList = action.payload;
    }
  },
});

export const {setUser, setFavoriteList} = userSlice.actions;

export default userSlice.reducer;