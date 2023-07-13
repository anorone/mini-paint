import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { logIn, resetRequestStatus } from '../slices/authSlice';
import { Message } from './';
import type { SubmitHandler } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const inputRef = useRef<HTMLInputElement>(null);
  const requestStatus = useTypedSelector((state) => state.auth.requestStatus);
  const dispatch = useTypedDispatch();

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    dispatch(resetRequestStatus());
  }, [dispatch]);

  const onLogin: SubmitHandler<Inputs> = (inputs) => {
    dispatch(logIn(inputs));
  };

  return (
    <Box component="form" maxWidth="sm" onSubmit={handleSubmit(onLogin)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('email')}
            id="email"
            label="Email address"
            type="email"
            inputRef={inputRef}
            autoComplete="email"
            required
            fullWidth
            error={requestStatus === 'failed'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('password')}
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
            error={requestStatus === 'failed'}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large" fullWidth>
            {requestStatus === 'loading' ? 'Submitting...' : 'Log In'}
          </Button>
        </Grid>
        {requestStatus === 'failed' && (
          <Grid item xs={12}>
            <Message variant="caption">
              Something went wrong. Check if your e-mail / password is correct.
            </Message>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default LoginForm;
