import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import api from '../../services/api';

import { Creators as LoginActions } from '../ducks/login';

export function* login(action) {
  const response = yield call(api.post, '/login', action.data);

  if (response.ok) {
    localStorage.setItem('@meetapp/token', response.data.token);

    yield put(LoginActions.postLoginSuccess());

    return response.data.first_login ? yield put(push('/preferences')) : yield put(push('/dashboard'));
  }
  if (response.status === 401) {
    toast.error('E-mail ou senha inválidos.');
  }
  else if (response.status === 400) {
    toast.error(response.data[0].message);
  }
  else {
    toast.error('Ocorreu em erro no servidor nesta requisição.');
  }

  yield put(LoginActions.postLoginFailure());
}
