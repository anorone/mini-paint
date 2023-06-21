import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Root from './Root';
import WelcomePage from './WelcomePage';
import AuthPage from './AuthPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<WelcomePage />} />
      <Route path="auth" element={<AuthPage />} />
    </Route>
  )
);

const routes = {
  auth: () => '/auth',
};

export { routes };
export default router;
