import { type Booking } from '@/@types';
import { type ValueOf } from '@/@types/utils';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addBooking, deleteBooking, getAllBookings } from './actions';
import { DataStatus } from '@/constants/redux';
import { HTTPError } from '@/libs/http/httpError';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  error: string | null;
  bookings: Booking[] | null;
  isGettingBookings: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  bookings: null,
  isGettingBookings: false
};

const { actions, reducer } = createSlice({
  extraReducers(builder) {
    builder
      .addCase(getAllBookings.fulfilled, (state, { payload }) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
        state.bookings = payload;
        state.isGettingBookings = false;
      })
      .addCase(getAllBookings.pending, (state) => {
        state.isGettingBookings = true;        
      })
      .addMatcher(isAnyOf(deleteBooking.fulfilled, addBooking.fulfilled), (state) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
        state.isGettingBookings = false;
      })
      .addMatcher(isAnyOf(deleteBooking.pending, addBooking.pending), state => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addMatcher(isAnyOf(getAllBookings.rejected, addBooking.rejected, deleteBooking.rejected), (state, action) => {
        const payload = action.payload as HTTPError;

        state.dataStatus = DataStatus.REJECTED;
        state.error = payload.message;
        state.bookings = null;
        state.isGettingBookings = false;
      });
  },
  initialState,
  name: 'bookings',
  reducers: {}
});

export { actions, reducer };
