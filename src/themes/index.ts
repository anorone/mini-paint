import { createTheme } from '@mui/material/styles';
import { pink, blueGrey } from '@mui/material/colors';
import { deepmerge } from '@mui/utils';
import darkPalette from './dark';
import lightPalette from './light';
import type { PaletteMode } from '@mui/material';

const generalPalette = {
  palette: {
    primary: pink,
    secondary: blueGrey,
  },
};

const palettes = {
  dark: darkPalette,
  light: lightPalette,
};

const getTheme = (mode: PaletteMode) => {
  const options = deepmerge(generalPalette, palettes[mode]);
  const theme = createTheme(options);
  return theme;
};

export default getTheme;
