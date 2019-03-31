import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '../../services/api';
import handleError from './error-handler';

import { LoginActions } from '../ducks/login';

export function* login(action) {
  const response = yield call(api.post, '/login', action.data);

  if (response.ok) {
    localStorage.setItem('@meetapp/token', response.data.token);

    yield put(LoginActions.postLoginSuccess());

    yield put(response.data.first_login ? push('/preferences') : push('/dashboard'));
  }
  else {
    yield put(handleError(response));
    yield put(LoginActions.postLoginFailure());
  }
}
