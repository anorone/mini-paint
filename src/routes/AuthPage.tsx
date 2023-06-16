import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Header, Main, Footer, AuthForm } from '../components';
import type { AuthType } from '../components/AuthForm';

const AuthPage = () => {
  const [authType, setAuthType] = useState<AuthType>('login');

  const switchAuthType = () => {
    setAuthType(authType === 'login' ? 'signup' : 'login');
  };

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
    <>
      <Header>
        <Typography
          fontWeight="bold"
          fontStyle="italic"
          fontSize="24px"
          letterSpacing="-0.0375em"
        >
          Paintter
        </Typography>
      </Header>
      <Main pt={9}>
        <AuthForm
          type={authType}
          switchType={switchAuthType}
          handleSubmit={handlers[authType]}
        />
      </Main>
      <Footer />
    </>
  );
};

export default AuthPage;
