import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LoginForm, SignupForm } from './';

type AuthType = 'login' | 'signup';

const AuthForm = () => {
  const location = useLocation();
  const [authType, setAuthType] = useState<AuthType>(
    location.state?.authType ?? 'login'
  );

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
      {authType === 'login' ? <LoginForm /> : <SignupForm />}
    </Box>
  );
};

export default AuthForm;
export type { AuthType };
