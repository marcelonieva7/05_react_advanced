import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { type Booking } from '@/@types';
import { AppRoutes } from '@/libs/router/appRoutes';
import { RouterProvider } from '@/libs/router/routerProvider';
import { Home } from '@/pages/home/Home';
import { Bookings } from '@/pages/bookings/bookings';
import { Root } from '@/pages/Root';
import { SignIn } from '@/pages/auth/signIn/signIn';
import { SignUp } from '@/pages/auth/signUp/signUp';
import { Trip } from '@/pages/trip/Trip';
import { useAppSelector } from '@/hooks/useAppSelector';
import { storageApi } from '@/libs/storage/storage';
import { StorageKey } from '@/constants/storage';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { authActions } from '@/libs/redux/slices/auth';
import { ProtectedRoute } from '@/components/protectedRoute/protectedRoute';
import { Loader } from '@/components/loader/loader';

import './App.css';
function App(): JSX.Element {
  const [ bookings, setBookings ] = useState<Booking[]>([]);
  const { user, isGetAuth } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (storageApi.has(StorageKey.TOKEN)) {
      dispatch(authActions.getAuth())
    }
  }, [dispatch]);

  return isGetAuth ? 
    <Loader />
      : (
    <RouterProvider
      routes={[
        {
          children: [
            {
              element: (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              ),
              path: AppRoutes.HOME,
            },
            {
              element: (
                <ProtectedRoute>
                  <Bookings setBookings={setBookings} bookings={bookings} />
                </ProtectedRoute>
              ),
              path: AppRoutes.BOOKINGS,
            },
            {
              element: (
                <ProtectedRoute>
                  <Trip setBookings={setBookings} />
                </ProtectedRoute>
              ),
              path: `${AppRoutes.TRIP}/:tripId`,
            },
            {
              element: user ? <Navigate to={AppRoutes.HOME} replace /> : <SignIn />,
              path: AppRoutes.SIGN_IN,
            },
            {
              element: user ? <Navigate to={AppRoutes.HOME} replace /> : <SignUp />,
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
