import { signUp, signIn, signOut} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  signIn,
  signOut
};

export { allActions as authActions };
export { reducer as authReducer } from './auth.slice.js';
