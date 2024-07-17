import { type Trip } from '@/@types';
import { type ValueOf } from '@/@types/utils';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getAllTrips, getTripById } from './actions';
import { DataStatus } from '@/constants/redux';
import { HTTPError } from '@/libs/http/httpError';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  error: string | null;
  trips: Trip[] | null;
  trip: Trip | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  trips: null,
  trip: null
};

const { actions, reducer } = createSlice({
  extraReducers(builder) {
    builder
      .addCase(getAllTrips.fulfilled, (state, { payload }) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
        state.trips = payload;
      })
      .addCase(getTripById.fulfilled, (state, { payload }) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
        state.trip = payload;
      })
      .addMatcher(isAnyOf(getAllTrips.pending, getTripById.pending), state => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addMatcher(isAnyOf(getAllTrips.rejected, getTripById.rejected), (state, action) => {
        const payload = action.payload as HTTPError;

        state.dataStatus = DataStatus.REJECTED;
        state.trip = null;
        state.trips = null;
        state.error = payload.message;
      });
  },
  initialState,
  name: 'trips',
  reducers: {}
});

export { actions, reducer };
