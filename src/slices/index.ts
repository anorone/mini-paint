import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

type State = ReturnType<typeof store.getState>;

export default store;
export type { State };
