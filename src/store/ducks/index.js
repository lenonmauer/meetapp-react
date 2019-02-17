import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as login } from './login';
import { reducer as profile } from './profile';
import { reducer as signup } from './signup';
import { reducer as categories } from './categories';

export default history => combineReducers({
  router: connectRouter(history),
  login,
  profile,
  signup,
  categories,
});
