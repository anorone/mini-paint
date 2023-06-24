import { Outlet, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks';
import { routes } from './';

const PrivateRoutes = () => {
  const user = useTypedSelector((state) => state.auth.user);
  return user ? <Outlet /> : <Navigate to={routes.auth()} />;
};

export default PrivateRoutes;
