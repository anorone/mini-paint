import { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type AuthType = 'login' | 'signup';

const AuthForm = () => {
  const [authType, setAuthType] = useState<AuthType>('login');

  const nameFieldRef = useRef<HTMLInputElement>(null);
  const mailFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fieldRef = authType === 'login' ? mailFieldRef : nameFieldRef;
    fieldRef.current?.focus();
  }, [authType]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handlers = {
    login: handleLogin,
    signup: handleSignup,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Button
          variant="text"
          color="inherit"
          onClick={() => setAuthType('login')}
          disabled={authType === 'login'}
        >
          Log In
        </Button>
        <Button
          variant="text"
          color="inherit"
          onClick={() => setAuthType('signup')}
          disabled={authType === 'signup'}
        >
          Sign Up
        </Button>
      </Box>
      <Box component="form" maxWidth="sm" onSubmit={handlers[authType]}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} hidden={authType === 'login'}>
            <TextField
              id="first-name"
              name="first-name"
              label="First name"
              inputRef={nameFieldRef}
              autoComplete="given-name"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} hidden={authType === 'login'}>
            <TextField
              id="last-name"
              name="last-name"
              label="Last name"
              autoComplete="family-name"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="e-mail"
              name="e-mail"
              label="Email address"
              inputRef={mailFieldRef}
              autoComplete="email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large" fullWidth>
              {authType === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthForm;
