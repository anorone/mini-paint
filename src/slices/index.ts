import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dataReducer from './dataSlice';
import editorSlice from './editorSlice';
import themeReducer from './themeSlice';
import type { ThunkAction, AnyAction } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    editor: editorSlice,
    theme: themeReducer,
  },
});

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  AnyAction
>;

export default store;
export type { State, Dispatch, Thunk };
