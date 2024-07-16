import {
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
  configureStore
} from '@reduxjs/toolkit';          
import { authApi } from '@/libs/api/authApi';
import { authReducer } from './slices/auth/auth';
import { storageApi, type Storage } from '@/libs/storage/storage';
import { authErrorMiddleware } from './middleware/authErrorMiddleware';
import { notificationErrorMiddleware } from './middleware/notificationErrorMiddleware';
  
type RootReducer = {
  auth: ReturnType<typeof authReducer>;
};
  
type ExtraArguments = {
  authApi: typeof authApi;
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
        auth: authReducer
      }
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      storageApi
    };
  }

  public get instance(): StoreInstance {
    return this.#instance;
  }
}

const store = new Store();
  
export { store };