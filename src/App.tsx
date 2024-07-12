import { AppRoutes } from '@/libs/router/appRoutes';
import { RouterProvider } from '@/libs/router/routerProvider';
import { Home } from '@/pages/home/Home';
import { Root } from '@/pages/Root';
import { Todos } from '@/pages/Todos';
import { Trip } from './pages/trip/Trip';
import { Navigate } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <RouterProvider
      routes={[
        {
          children: [
            {
              element: <Home />,
              path: AppRoutes.HOME,
            },
            {
              element: <Todos />,
              path: AppRoutes.BOOKINGS,
            },
            {
              element: <Trip />,
              path: `${AppRoutes.TRIP}/:id`,
            },
          ],
          path: AppRoutes.ROOT,
          element: <Root />,
        },
        {
          path: '*',
          element: <Navigate to={AppRoutes.HOME} replace />
        }
      ]}
    />
  );
}

export default App;
