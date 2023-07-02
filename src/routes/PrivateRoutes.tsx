import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../hooks';
import { routes } from './';

const PrivateRoutes = () => {
  const location = useLocation();
  const user = useTypedSelector((state) => state.auth.user);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={routes.auth()} state={{ from: location }} />
  );
};

export default PrivateRoutes;
