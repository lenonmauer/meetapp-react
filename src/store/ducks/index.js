import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';

import { reducer as login } from './login';
import { reducer as profile } from './profile';
import { reducer as signup } from './signup';
import { reducer as categories } from './categories';
import { reducer as upload } from './upload';
import { reducer as meetup } from './meetup';
import { reducer as subscription } from './subscription';

export default history => combineReducers({
  router: connectRouter(history),
  toastr,
  login,
  meetup,
  profile,
  signup,
  categories,
  upload,
  subscription,
});
