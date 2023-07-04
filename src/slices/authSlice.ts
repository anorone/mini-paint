import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import type { Thunk } from './';

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

const subscribeToAuthStateChange = (): Thunk => (dispatch) => {
  const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
    dispatch(setUser(user));
  });
  return unsubscribe;
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
    resetRequestStatus: (auth) => {
      auth.requestStatus = 'idle';
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

export const { setUser, resetRequestStatus } = authSlice.actions;
export { subscribeToAuthStateChange, logIn, signUp, logOut };
export default authSlice.reducer;
