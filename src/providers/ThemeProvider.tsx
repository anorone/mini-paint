import { ThemeProvider as ColorThemeProvider } from '@mui/material/styles';
import getTheme from '../themes';

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => (
  <ColorThemeProvider theme={getTheme('dark')}>{children}</ColorThemeProvider>
);

export default ThemeProvider;
