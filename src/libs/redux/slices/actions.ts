import {
  type UserSignUpResponseDto,
  type UserSignUpRequestDto,
  type UserSignInResponseDto,
  type UserSignInRequestDto
} from '@/@types/api';
import { type AsyncThunkConfig } from '@/@types/redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { StorageKey } from '@/constants/storage';

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
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Sign up failed, please try again"

      return rejectWithValue(errorMessage);
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
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Sign in failed, please try again"

      return rejectWithValue(errorMessage);
    }
  }
);

const signOut = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SIGN_OUT,
  async (_, { extra: { storageApi } }) => {
    storageApi.drop(StorageKey.TOKEN);
  }
);

export { signUp, signIn, signOut };
