import { Link } from 'react-router-dom';
import { Header, Main, Footer, Logo, AuthForm } from '../components';

const AuthPage = () => (
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

export default AuthPage;
