import { signUp, signIn} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  signIn
};

export { allActions as authActions };
export { reducer as authReducer } from './auth.slice.js';
