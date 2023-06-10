import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PaletteMode } from '@mui/material';

interface ColorTheme {
  mode: PaletteMode;
}

const initialState: ColorTheme = {
  mode: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (theme) => {
      theme.mode = theme.mode === 'dark' ? 'light' : 'dark';
    },
    setTheme: (theme, action: PayloadAction<ColorTheme>) => {
      theme.mode = action.payload.mode;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
