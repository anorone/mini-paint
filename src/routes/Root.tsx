import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { App } from '../components';

const Root = () => (
  <Container maxWidth="md">
    <App>
      <Outlet />
    </App>
  </Container>
);

export default Root;
