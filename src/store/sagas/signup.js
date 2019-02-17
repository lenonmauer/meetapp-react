import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import api from '../../services/api';

import { SignUpActions } from '../ducks/signup';

export function* signUp(action) {
  const response = yield call(api.post, '/users', action.data);

  if (response.ok) {
    yield put(push('/login'));
    toast.success('Cadastro realizado com sucesso. Faça o login.');
  }
  else if (response.status === 400) {
    toast.error(response.data[0].message);
  }
  else {
    toast.error('Ocorreu em erro no servidor nesta requisição.');
  }

  yield put(SignUpActions.postSignUpComplete());
}
