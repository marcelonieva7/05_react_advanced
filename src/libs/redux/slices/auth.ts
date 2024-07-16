import { signUp, signIn, signOut, getAuth} from './actions';
import { actions } from './auth.slice';

const allActions = {
  ...actions,
  signUp,
  signIn,
  signOut,
  getAuth
};

export { allActions as authActions };
export { reducer as authReducer } from './auth.slice';
