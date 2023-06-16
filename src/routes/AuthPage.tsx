import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Main, Footer, Logo, AuthForm } from '../components';
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
        <Logo component={Link} to="/" />
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
