import { type User } from '@/@types';
import { type ValueOf } from '@/@types/utils';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signUp, signIn, signOut } from './actions';
import { DataStatus } from '@/constants/redux';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  error: null | string;
  user: User | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  user: null
};

const { actions, reducer } = createSlice({
  extraReducers(builder) {
    builder
      .addCase(signOut.fulfilled, () => initialState)
      .addMatcher(isAnyOf(signUp.pending, signIn.pending), state => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addMatcher(isAnyOf(signUp.fulfilled, signIn.fulfilled), (state, { payload }) => {
        state.user = payload.user;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
      })
      .addMatcher(isAnyOf(signUp.rejected, signIn.rejected), (state, { payload }) => {
        const errorMessage = typeof payload === 'string' ? payload : null;

        state.dataStatus = DataStatus.REJECTED;
        state.error = errorMessage;
        state.user = null;
      });
  },
  initialState,
  name: 'auth',
  reducers: {}
});

export { actions, reducer };
