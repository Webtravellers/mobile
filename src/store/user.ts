import { PostService } from './../services/postService';
import { PostModel } from './../types/PostModel';
import { UserModel } from './../types/userModel';
import Location from './../types/LocationModel';
import { UserService } from '../services/userService';
import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

const userService = new UserService();
const postService = new PostService()

export const fetchUserById = createAsyncThunk<UserModel, string, {}>(
  'users/fetchByIdStatus',
  async (userId: string, thunkAPI) => {
    const response = await userService.getUser(userId)
    return response.data.data
  }
)

export const fetchPostByUserId = createAsyncThunk<PostModel[], string, {}>(
  'users/fetchPostByUserIdStatus',
  async (userId: string, thunkAPI) => {
    const response = await postService.getPostsByUserId(userId)
    return response.data.data
  }
)


const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: <UserModel | null>{},
    favoriteList: <Location[] | null>[],
    posts: <PostModel[] | null>[],
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
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload;
    }),
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.user = null;
    }),
    builder.addCase(fetchPostByUserId.fulfilled, (state, action) => {
      state.posts = action.payload;
    }),
    builder.addCase(fetchPostByUserId.rejected, (state, action) => {
      state.posts = null;
    })
  }
});

export const { setUser, setFavoriteList } = userSlice.actions;

export default userSlice.reducer;