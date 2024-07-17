import { getAllTrips, getTripById} from './actions';
import { actions } from './slice';

const allActions = {
  ...actions,
  getAllTrips,
  getTripById
};

export { allActions as tripsActions };
export { reducer as tripsReducer } from './slice';
