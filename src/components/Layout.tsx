import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Anchor from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { useTypedSelector } from '../hooks';
import { LogoutButton, ThemeSwitch } from './';
import { routes } from '../routes';
import type { BoxProps } from '@mui/material/Box';

const App = (props: BoxProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
    {...props}
  />
);

const Header = (props: BoxProps) => {
  const user = useTypedSelector((state) => state.auth.user);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        rowGap: 2,
        minHeight: 60,
        py: 1,
      }}
      component="header"
      {...props}
    >
      {props.children}
      <ThemeSwitch sx={{ ml: 'auto', color: 'text.primary' }} />
      <Box sx={{ ml: 3 }}>
        {user ? (
          <LogoutButton />
        ) : (
          <Avatar
            sx={{ width: 32, height: 32 }}
            component={Link}
            to={routes.auth()}
          />
        )}
      </Box>
    </Box>
  );
};

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
      <Anchor
        color="text.primary"
        href="https://github.com/anorone/mini-paint/tree/dev"
      >
        source code
      </Anchor>
    </Typography>
  </Box>
);

export { App, Header, Main, Footer };
