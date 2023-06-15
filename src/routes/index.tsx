import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Root from './Root';
import WelcomePage from './WelcomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<WelcomePage />} />
    </Route>
  )
);

export default router;
