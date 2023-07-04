import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useTypedDispatch } from '../hooks';
import { subscribeToAuthStateChange } from '../slices/authSlice';
import { App } from '../components';

const Root = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => dispatch(subscribeToAuthStateChange()), [dispatch]);

  return (
    <Container maxWidth="md">
      <App>
        <Outlet />
      </App>
    </Container>
  );
};

export default Root;
