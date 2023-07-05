import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addUser } from '../api/users';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import type { Thunk } from './';

interface Auth {
  user: User | null;
  requestStatus: 'idle' | 'loading' | 'failed';
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  firstName: string;
  lastName: string;
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
  async ({ email, password }: LoginData) => {
    await signInWithEmailAndPassword(getAuth(), email, password);
  }
);

const signUp = createAsyncThunk(
  'auth/signup',
  async ({ email, password, firstName, lastName }: SignupData) => {
    const { user } = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    await addUser({ id: user.uid, firstName, lastName });
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
