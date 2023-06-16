import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Header, Main, Footer, Logo, BouncingButton } from '../components';
import { routes } from './';

const WelcomePage = () => (
  <>
    <Header />
    <Main pt={12} textAlign="center">
      <Logo variant="h1" size="large" />
      <Typography paragraph mb={3} fontSize={{ xs: null, sm: '1.25rem' }}>
        stay alone with your endless imagination
      </Typography>
      <BouncingButton variant="contained" component={Link} to={routes.auth()}>
        Start Now
      </BouncingButton>
    </Main>
    <Footer />
  </>
);

export default WelcomePage;
