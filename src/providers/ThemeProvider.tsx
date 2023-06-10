import { ThemeProvider as ColorThemeProvider } from '@mui/material/styles';
import { useTypedSelector } from '../hooks';
import getTheme from '../themes';

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const mode = useTypedSelector((state) => state.theme.mode);

  return (
    <ColorThemeProvider theme={getTheme(mode)}>{children}</ColorThemeProvider>
  );
};

export default ThemeProvider;
