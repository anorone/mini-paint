import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material';
import { toggleTheme, setTheme } from '../slices/themeSlice';
import type { PaletteMode } from '@mui/material';

const useColorTheme = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const toggleColorTheme = () => dispatch(toggleTheme());
  const setColorTheme = (mode: PaletteMode) => dispatch(setTheme({ mode }));
  return { theme, toggleColorTheme, setColorTheme };
};

export default useColorTheme;
