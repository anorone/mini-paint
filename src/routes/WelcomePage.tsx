import Typography from '@mui/material/Typography';
import { Header, Main, Footer, BouncingButton } from '../components';

const WelcomePage = () => (
  <>
    <Header />
    <Main pt={12} textAlign="center">
      <Typography
        variant="h1"
        fontWeight="bold"
        fontStyle="italic"
        fontSize={{ xs: null, sm: '9rem' }}
        letterSpacing="-0.0375em"
      >
        Paintter
      </Typography>
      <Typography paragraph mb={3} fontSize={{ xs: null, sm: '1.25rem' }}>
        stay alone with your endless imagination
      </Typography>
      <BouncingButton variant="contained">Start Now</BouncingButton>
    </Main>
    <Footer />
  </>
);

export default WelcomePage;
