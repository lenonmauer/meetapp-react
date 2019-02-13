import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import login from './login';
import profile from './profile';
import signup from './signup';
import categories from './categories';

export default history => combineReducers({
  router: connectRouter(history),
  login,
  profile,
  signup,
  categories,
});
