import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Root from './Root';
import WelcomePage from './WelcomePage';
import AuthPage from './AuthPage';
import PrivateRoutes from './PrivateRoutes';
import FeedPage from './FeedPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<WelcomePage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="feed" element={<FeedPage />} />
      </Route>
    </Route>
  )
);

const routes = {
  auth: () => '/auth',
  feed: (params: Record<string, string | number | null> = {}) => {
    const entries = Object.entries(params)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, value!.toString()]);
    const searchParams = new URLSearchParams(entries).toString();
    return searchParams ? `/feed?${searchParams}` : '/feed';
  },
};

export { routes };
export default router;
