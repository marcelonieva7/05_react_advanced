import { type TripResponseDto } from '@/@types/api';
import { type AsyncThunkConfig } from '@/@types/redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { HTTPError } from '@/libs/http/httpError';


const getAllTrips = createAsyncThunk<
  TripResponseDto[],
  void,
  AsyncThunkConfig
>(
  ActionType.GET_ALL_TRIPS,
  async (_, { extra: { tripsApi }, rejectWithValue }) => {
    try {
      return await tripsApi.getAll();
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error, message: error.message});
    }
  }
);

const getTripById = createAsyncThunk<
  TripResponseDto,
  {tripId: string},
  AsyncThunkConfig
>(
  ActionType.GET_TRIP_BY_ID,
  async ({tripId}, { extra: { tripsApi }, rejectWithValue }) => {
    try {
      return await tripsApi.getById(tripId);
    } catch (err) {
      const error = err as HTTPError
      return rejectWithValue({...error, message: error.message});
    }
  }
);

export { getAllTrips, getTripById };
