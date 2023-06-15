import { ThemeProvider } from '@mui/material/styles';
import { useTypedSelector } from '../hooks';
import getTheme from '../themes';

interface Props {
  children?: React.ReactNode;
}

const ColorThemeProvider = (props: Props) => {
  const mode = useTypedSelector((state) => state.theme.mode);
  return <ThemeProvider theme={getTheme(mode)} {...props} />;
};

export default ColorThemeProvider;
