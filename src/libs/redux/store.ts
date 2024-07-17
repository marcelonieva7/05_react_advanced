import {
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
  configureStore
} from '@reduxjs/toolkit';          
import { type AuthApi,authApi } from '@/libs/api/authApi';
import { type TripsApi, tripsApi } from '@/libs/api/tripsApi';
import { type BookingsApi, bookingsApi } from '@/libs/api/bookings';
import { authReducer } from './slices/auth/auth';
import { tripsReducer } from './slices/trips';
import { bookingsReducer } from './slices/bookings';
import { storageApi, type Storage } from '@/libs/storage/storage';
import { authErrorMiddleware } from './middleware/authErrorMiddleware';
import { notificationErrorMiddleware } from './middleware/notificationErrorMiddleware';
  
type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  trips: ReturnType<typeof tripsReducer>;
  bookings: ReturnType<typeof bookingsReducer>;
};
  
type ExtraArguments = {
  authApi: AuthApi;
  tripsApi: TripsApi;
  bookingsApi: BookingsApi
  storageApi: Storage;
};

type StoreInstance = ReturnType<
  typeof configureStore<
    RootReducer,
    UnknownAction,
    Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
  >
>;

class Store {
  #instance: StoreInstance;

  public constructor() {
    this.#instance = configureStore({
      middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments
          }
        }).prepend([
          authErrorMiddleware.middleware,
          notificationErrorMiddleware.middleware
        ]);
      },
      reducer: {
        auth: authReducer,
        trips: tripsReducer,
        bookings: bookingsReducer
      }
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      tripsApi,
      bookingsApi,
      storageApi
    };
  }

  public get instance(): StoreInstance {
    return this.#instance;
  }
}

const store = new Store();
  
export { store };