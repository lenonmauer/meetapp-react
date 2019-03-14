import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import api from '../../services/api';

import { LoginActions } from '../ducks/login';

export function* login(action) {
  const response = yield call(api.post, '/login', action.data);

  if (response.ok) {
    localStorage.setItem('@meetapp/token', response.data.token);

    yield put(LoginActions.postLoginSuccess());

    return response.data.first_login ? yield put(push('/preferences')) : yield put(push('/dashboard'));
  }

  if (response.status === 400) {
    yield put(toastrActions.add({
      type: 'error',
      message: response.data.error,
    }));
  }
  else if (response.status === 422) {
    yield put(toastrActions.add({
      type: 'error',
      message: 'As informações contidas no formulário estão inválidas.',
    }));
  }
  else {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no servidor nesta requisição.',
    }));
  }

  return yield put(LoginActions.postLoginFailure());
}
