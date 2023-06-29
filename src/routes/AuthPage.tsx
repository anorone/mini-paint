import { Link, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks';
import { Header, Main, Footer, Logo, AuthForm } from '../components';
import { routes } from './';

const AuthPage = () => {
  const user = useTypedSelector((state) => state.auth.user);

  return user ? (
    <Navigate to={routes.feed()} />
  ) : (
    <>
      <Header>
        <Logo component={Link} to="/" />
      </Header>
      <Main pt={9}>
        <AuthForm />
      </Main>
      <Footer />
    </>
  );
};

export default AuthPage;
