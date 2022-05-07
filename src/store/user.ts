import { UserModel } from './../types/userModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: <UserModel>{},
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    }
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;