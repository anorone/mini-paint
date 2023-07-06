import { Link, Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../hooks';
import { Header, Main, Footer, Logo, AuthForm } from '../components';
import { routes } from './';

const AuthPage = () => {
  const user = useTypedSelector((state) => state.auth.user);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.state?.from?.search);

  return user ? (
    <Navigate to={routes.feed(Object.fromEntries(searchParams))} />
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
