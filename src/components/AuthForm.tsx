import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { SubmitHandler } from 'react-hook-form';

type AuthType = 'login' | 'signup';

interface LoginFields {
  email: string;
  password: string;
}

interface SignupFields extends LoginFields {
  firstName: string;
  lastName: string;
}

const AuthForm = () => {
  const [authType, setAuthType] = useState<AuthType>('login');
  const { register, handleSubmit } = useForm<SignupFields>();

  const nameFieldRef = useRef<HTMLInputElement>(null);
  const mailFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fieldRef = authType === 'login' ? mailFieldRef : nameFieldRef;
    fieldRef.current?.focus();
  }, [authType]);

  const handleLogin: SubmitHandler<LoginFields> = (values) => {
    console.log(values);
  };

  const handleSignup: SubmitHandler<SignupFields> = (values) => {
    console.log(values);
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
      <Box
        component="form"
        maxWidth="sm"
        onSubmit={handleSubmit(handlers[authType])}
      >
        <Grid container spacing={2}>
          {authType === 'signup' && (
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('firstName')}
                id="first-name"
                label="First name"
                inputRef={nameFieldRef}
                autoComplete="given-name"
                required
                fullWidth
              />
            </Grid>
          )}
          {authType === 'signup' && (
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('lastName')}
                id="last-name"
                label="Last name"
                autoComplete="family-name"
                required
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              {...register('email')}
              id="email"
              label="Email address"
              type="email"
              inputRef={mailFieldRef}
              autoComplete="email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('password')}
              id="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 8 }}
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
