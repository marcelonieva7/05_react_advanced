import { addBooking, deleteBooking, getAllBookings} from './actions';
import { actions } from './slice';

const allActions = {
  ...actions,
  getAllBookings,
  addBooking,
  deleteBooking
};

export { allActions as bookingsActions };
export { reducer as bookingsReducer } from './slice';
