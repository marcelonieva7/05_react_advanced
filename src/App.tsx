import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '@/libs/router/appRoutes';
import { RouterProvider } from '@/libs/router/routerProvider';
import { Home } from '@/pages/home/Home';
import { Bookings } from '@/pages/bookings/bookings';
import { Root } from '@/pages/Root';
import { SignIn } from '@/pages/auth/signIn/signIn';
import { Trip } from '@/pages/trip/Trip';
import { type Booking } from '@/@types';

import './App.css';

function App(): JSX.Element {
const [bookings, setBookings] = useState<Booking[]>([]);
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
              element: <Bookings setBookings={setBookings} bookings={bookings} />,
              path: AppRoutes.BOOKINGS,
            },
            {
              element: <Trip setBookings={setBookings} />,
              path: `${AppRoutes.TRIP}/:id`,
            },
            {
              element: <SignIn />,
              path: AppRoutes.SIGN_IN,
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
