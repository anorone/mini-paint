import { Header, Main, Logo } from '../components';
import { Link } from 'react-router-dom';

const FeedPage = () => (
  <>
    <Header>
      <Logo component={Link} to="/" />
    </Header>
    <Main />
  </>
);

export default FeedPage;
