import {
  type UserSignUpResponseDto,
  type UserSignUpRequestDto,
  type UserSignInResponseDto,
  type UserSignInRequestDto,
  UserAuthenticateResponseDto
} from '@/@types/api';
import { type AsyncThunkConfig } from '@/@types/redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { StorageKey } from '@/constants/storage';
import { HTTPError } from '@/libs/http/httpError';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(
  ActionType.SIGN_UP,
  async (request, { extra: { authApi, storageApi }, rejectWithValue }) => {
    try {
      const response = await authApi.signUp(request);
      storageApi.set(StorageKey.TOKEN, response.token);

      return response;
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error});
    }
  }
);

const signIn = createAsyncThunk<
  UserSignInResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(
  ActionType.SIGN_IN,
  async (request, { extra: { authApi, storageApi }, rejectWithValue }) => {
    try {
      const response = await authApi.signIn(request);
      storageApi.set(StorageKey.TOKEN, response.token);

      return response;
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error});
    }
  }
);

const signOut = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SIGN_OUT,
  async (_, { extra: { storageApi } }) => {
    storageApi.drop(StorageKey.TOKEN);
  }
);

const getAuth = createAsyncThunk<
  UserAuthenticateResponseDto,
  void,
  AsyncThunkConfig
>(
  ActionType.GET_AUTH,
  async (_, { extra: { authApi }, rejectWithValue }) => {
    try {
      return await authApi.getAuthenticatedUser();
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error});
    }
  }
);

export { signUp, signIn, signOut, getAuth };
