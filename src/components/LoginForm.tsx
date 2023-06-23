import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { SubmitHandler } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const onLogin: SubmitHandler<Inputs> = (values) => {
    console.log(values);
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
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large" fullWidth>
            Log In
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
