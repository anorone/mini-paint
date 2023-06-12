import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ThemeSwitch } from './';
import type { BoxProps } from '@mui/material/Box';

const App = (props: BoxProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}
    {...props}
  />
);

const Header = (props: BoxProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      minHeight: 60,
      py: 1,
    }}
    component="header"
    {...props}
  >
    {props.children}
    <ThemeSwitch sx={{ ml: 'auto', color: 'text.primary' }} />
  </Box>
);

const Main = (props: BoxProps) => (
  <Box sx={{ flexGrow: 1 }} component="main" {...props} />
);

const Footer = (props: BoxProps) => (
  <Box
    sx={{
      py: 1,
      minHeight: 50,
      textAlign: 'center',
    }}
    component="footer"
    {...props}
  >
    <Typography
      sx={{
        color: 'text.secondary',
        fontSize: '0.9rem',
        lineHeight: '50px',
      }}
    >
      View the{' '}
      <Link color="text.primary" href="https://github.com/anorone/mini-paint">
        source code
      </Link>
    </Typography>
  </Box>
);

export { App, Header, Main, Footer };
