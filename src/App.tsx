import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '@/libs/router/appRoutes';
import { RouterProvider } from '@/libs/router/routerProvider';
import { Home } from '@/pages/home/Home';
import { Bookings } from '@/pages/bookings/bookings';
import { Root } from '@/pages/Root';
import { SignIn } from '@/pages/auth/signIn/signIn';
import { SignUp } from '@/pages/auth/signUp/signUp';
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
              path: `${AppRoutes.TRIP}/:tripId`,
            },
            {
              element: <SignIn />,
              path: AppRoutes.SIGN_IN,
            },
            {
              element: <SignUp />,
              path: AppRoutes.SIGN_UP,
            },
          ],
          path: AppRoutes.ROOT,
          element: <Root />,
        },
        {
          path: AppRoutes.ANY,
          element: <Navigate to={AppRoutes.HOME} replace />
        }
      ]}
    />
  );
}

export default App;
