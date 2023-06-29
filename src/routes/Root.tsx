import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Container from '@mui/material/Container';
import { useTypedDispatch } from '../hooks';
import { setUser } from '../slices/authSlice';
import { App } from '../components';

const Root = () => {
  const dispatch = useTypedDispatch();

  useEffect(
    () => onAuthStateChanged(getAuth(), (user) => dispatch(setUser(user))),
    [dispatch]
  );

  return (
    <Container maxWidth="md">
      <App>
        <Outlet />
      </App>
    </Container>
  );
};

export default Root;
