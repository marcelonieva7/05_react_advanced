import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { StorageKey } from '@/constants/storage';
import { type UserSignUpResponseDto, type UserSignUpRequestDto } from '@/@types/api';
import { type AsyncThunkConfig } from '@/@types/redux';

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

export { signUp };
