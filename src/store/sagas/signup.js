import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import api from '../../services/api';
import handleError from './error-handler';

import { SignUpActions } from '../ducks/signup';

export function* signUp(action) {
  const response = yield call(api.post, '/users', action.data);

  if (response.ok) {
    yield put(
      toastrActions.add({
        type: 'success',
        message: 'Cadastro realizado com sucesso. Faça o login.',
      }),
    );

    yield put(push('/login'));
  }
  else {
    yield put(handleError(response));
  }

  yield put(SignUpActions.postSignUpComplete());
}
