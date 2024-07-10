import {
  RouterProvider as LibraryRouterProvider,
  createBrowserRouter,
  type RouteObject
} from 'react-router-dom';
  
const RouterProvider = ({ routes }: { routes: RouteObject[] }) => (
  <LibraryRouterProvider router={createBrowserRouter(routes)} />
);

export { RouterProvider };
