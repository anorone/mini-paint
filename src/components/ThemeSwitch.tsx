import IconButton from '@mui/material/IconButton';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import { useColorTheme } from '../hooks';
import type { IconButtonProps } from '@mui/material/IconButton';

const ThemeSwitch = (props: IconButtonProps) => {
  const { theme, toggleColorTheme } = useColorTheme();

  const ModeIcon = theme.palette.mode === 'dark' ? DarkMode : LightMode;

  return (
    <IconButton size="large" {...props} onClick={toggleColorTheme}>
      <ModeIcon fontSize="inherit" />
    </IconButton>
  );
};

export default ThemeSwitch;
