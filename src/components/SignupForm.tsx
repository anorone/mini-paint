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
  firstName: string;
  lastName: string;
}

const SignupForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const onSignup: SubmitHandler<Inputs> = (values) => {
    console.log(values);
  };

  return (
    <Box component="form" maxWidth="sm" onSubmit={handleSubmit(onSignup)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('firstName')}
            id="first-name"
            label="First name"
            inputRef={inputRef}
            autoComplete="given-name"
            required
            fullWidth
          />
        </Grid>
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
        <Grid item xs={12}>
          <TextField
            {...register('email')}
            id="email"
            label="Email address"
            type="email"
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
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
