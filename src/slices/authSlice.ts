import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

interface Auth {
  user: User | null;
  requestStatus: 'idle' | 'loading' | 'failed';
}

interface Credentials {
  email: string;
  password: string;
}

const initialState: Auth = {
  user: null,
  requestStatus: 'idle',
};

const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }: Credentials) => {
    await signInWithEmailAndPassword(getAuth(), email, password);
  }
);

const signUp = createAsyncThunk(
  'auth/signup',
  async ({ email, password }: Credentials) => {
    await createUserWithEmailAndPassword(getAuth(), email, password);
  }
);

const logOut = createAsyncThunk('auth/logout', async () => {
  await signOut(getAuth());
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (auth, action: PayloadAction<Auth['user']>) => {
      auth.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) => type.startsWith('auth/') && type.endsWith('/pending'),
        (auth) => {
          auth.requestStatus = 'loading';
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('auth/') && type.endsWith('/fulfilled'),
        (auth) => {
          auth.requestStatus = 'idle';
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('auth/') && type.endsWith('/rejected'),
        (auth) => {
          auth.requestStatus = 'failed';
        }
      );
  },
});

export const { setUser } = authSlice.actions;
export { logIn, signUp, logOut };
export default authSlice.reducer;
