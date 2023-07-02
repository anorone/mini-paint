import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dataReducer from './dataSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    theme: themeReducer,
  },
});

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export default store;
export type { State, Dispatch };
