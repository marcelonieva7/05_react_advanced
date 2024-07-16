import { useEffect, useState } from 'react';
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
import { useAppSelector } from './hooks/useAppSelector';

import './App.css';
import { storageApi } from './libs/storage/storage';
import { StorageKey } from './constants/storage';
import { useAppDispatch } from './hooks/useAppDispatch';
import { authActions } from './libs/redux/slices/auth';
import { DataStatus } from './constants/redux';
import { ProtectedRoute } from './components/protectedRoute/protectedRoute';

function App(): JSX.Element {
  const [ bookings, setBookings ] = useState<Booking[]>([]);
  const { user, dataStatus } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch()
  const isLoading = dataStatus === DataStatus.PENDING;

  useEffect(() => {
    if (storageApi.has(StorageKey.TOKEN)) {
      dispatch(authActions.getAuth())
    }
  }, [dispatch]);

  return isLoading ? <div className='loader'></div> : (
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
