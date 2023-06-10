import { grey } from '@mui/material/colors';

const darkPalette = {
  palette: {
    mode: 'dark',
    background: {
      default: grey[800],
      paper: grey[800],
    },
    text: {
      primary: grey[300],
    },
  },
} as const;

export default darkPalette;
