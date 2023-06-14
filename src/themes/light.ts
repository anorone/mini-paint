import { grey } from '@mui/material/colors';

const lightPalette = {
  palette: {
    mode: 'light',
    background: {
      default: grey[300],
      paper: grey[300],
    },
  },
} as const;

export default lightPalette;
