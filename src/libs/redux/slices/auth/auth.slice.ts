import { type User } from '@/@types';
import { type ValueOf } from '@/@types/utils';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, getAuth } from './actions';
import { DataStatus } from '@/constants/redux';
import { HTTPError } from '@/libs/http/httpError';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  error: null | string;
  user: User | null;
  isGetAuth: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  user: null,
  isGetAuth: false
};

const { actions, reducer } = createSlice({
  extraReducers(builder) {
    builder
      .addCase(signOut.fulfilled, () => initialState)
      .addCase(getAuth.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
        state.isGetAuth = false;
      })
      .addCase(getAuth.pending, state => {
        state.isGetAuth = true;
      })
      .addMatcher(isAnyOf(signUp.pending, signIn.pending), state => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addMatcher(isAnyOf(signUp.fulfilled, signIn.fulfilled), (state, { payload }) => {
        state.user = payload.user;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
      })
      .addMatcher(isAnyOf(signUp.rejected, signIn.rejected, getAuth.rejected), (state, action) => {
        const payload = action.payload as HTTPError;

        state.dataStatus = DataStatus.REJECTED;
        state.isGetAuth = false;
        state.error = payload.message;
        state.user = null;
      });
  },
  initialState,
  name: 'auth',
  reducers: {}
});

export { actions, reducer };
