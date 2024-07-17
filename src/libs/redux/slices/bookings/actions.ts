import { type BookingsGetResponseDto, type BookingAddResponseDto } from '@/@types/api';
import { type AsyncThunkConfig } from '@/@types/redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { HTTPError } from '@/libs/http/httpError';

const getAllBookings = createAsyncThunk<
  BookingsGetResponseDto[],
  void,
  AsyncThunkConfig
>(
  ActionType.GET_BOOKINGS,
  async (_, { extra: { bookingsApi }, rejectWithValue }) => {
    try {
      return await bookingsApi.getAll();
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error, message: error.message});
    }
  }
);

const addBooking = createAsyncThunk<
  BookingsGetResponseDto,
  BookingAddResponseDto,
  AsyncThunkConfig
>(
  ActionType.ADD_BOOKING,
  async (payload, { extra: { bookingsApi }, rejectWithValue }) => {
    try {
      return await bookingsApi.addBooking(payload);
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error, message: error.message});
    }
  }
);

const deleteBooking = createAsyncThunk<
  {bookingId: string},
  {bookingId: string},
  AsyncThunkConfig
>(
  ActionType.DELETE_BOOKING,
  async ({bookingId}, { extra: { bookingsApi }, rejectWithValue }) => {
    try {
      await bookingsApi.deleteBooking(bookingId);
      return { bookingId };
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error, message: error.message});
    }
  }
);

export { getAllBookings, addBooking, deleteBooking };
