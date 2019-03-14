import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import api from '../../services/api';

import { SignUpActions } from '../ducks/signup';

export function* signUp(action) {
  const response = yield call(api.post, '/users', action.data);

  if (response.ok) {
    yield put(toastrActions.add({
      type: 'success',
      message: 'Cadastro realizado com sucesso. Faça o login.',
    }));

    yield put(push('/login'));
  }
  else if (response.status === 400) {
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

  yield put(SignUpActions.postSignUpComplete());
}
