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
import EditorPage from './EditorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<WelcomePage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="feed" element={<FeedPage />} />
        <Route path="editor" element={<EditorPage />} />
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
  editor: () => '/editor',
};

export { routes };
export default router;
