import { AppRoutes } from '@/libs/router/appRoutes';
import { RouterProvider } from '@/libs/router/routerProvider';
import { Home } from '@/pages/Home';
import { Root } from '@/pages/Root';
import { Todos } from '@/pages/Todos';

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
              path: AppRoutes.TODOS,
            },
          ],
          path: AppRoutes.ROOT,
          element: <Root />,
        },
      ]}
    />
  );
}

export default App;
