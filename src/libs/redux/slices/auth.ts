import { signUp } from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp
};

export { allActions as authActions };
export { reducer as authReducer } from './auth.slice.js';
