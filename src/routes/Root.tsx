import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Container from '@mui/material/Container';
import { useTypedDispatch } from '../hooks';
import { setUser } from '../slices/authSlice';
import { App } from '../components';

const Root = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <App>
        <Outlet />
      </App>
    </Container>
  );
};

export default Root;
