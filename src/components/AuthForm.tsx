import { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type AuthType = 'login' | 'signup';

interface Props {
  type: AuthType;
  switchType: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const AuthForm = ({ type, switchType, handleSubmit }: Props) => {
  const nameFieldRef = useRef<HTMLInputElement>(null);
  const mailFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fieldRef = type === 'login' ? mailFieldRef : nameFieldRef;
    fieldRef.current?.focus();
  }, [type]);

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
          onClick={switchType}
          disabled={type === 'login'}
        >
          Log In
        </Button>
        <Button
          variant="text"
          color="inherit"
          onClick={switchType}
          disabled={type === 'signup'}
        >
          Sign Up
        </Button>
      </Box>
      <Box component="form" maxWidth="sm" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="first-name"
              name="first-name"
              label="First name"
              inputRef={nameFieldRef}
              autoComplete="given-name"
              disabled={type === 'login'}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="last-name"
              name="last-name"
              label="Last name"
              autoComplete="family-name"
              disabled={type === 'login'}
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
              {type === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthForm;
export type { AuthType };
