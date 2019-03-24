import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import rootSaga from '../../store/sagas';

import {
  SignUpTypes,
  SignUpActions,
} from '../../store/ducks/signup';

const apiMock = new MockAdapter(api.axiosInstance);

describe('SignUp Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);
  });

  it('should be able to create a new user', async () => {
    apiMock.onPost('/users').reply(200, {});

    sagaTester.dispatch(SignUpActions.postSignUpRequest());

    await sagaTester.waitFor(SignUpTypes.POST_SIGN_UP_COMPLETE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(toastrActions.add({
      type: 'success',
      message: 'Cadastro realizado com sucesso. Faça o login.',
    }));

    expect(calledActions[2]).toEqual(
      push('/login'),
    );

    expect(calledActions[3]).toEqual(
      SignUpActions.postSignUpComplete(),
    );
  });

  it('should be able to show a toast message when an error occurs', async () => {
    const fixture = {
      error: 'Error',
    };
    apiMock.onPost('/users').reply(400, fixture);

    sagaTester.dispatch(SignUpActions.postSignUpRequest());

    await sagaTester.waitFor(SignUpTypes.POST_SIGN_UP_COMPLETE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(toastrActions.add({
      type: 'error',
      message: fixture.error,
    }));

    expect(calledActions[2]).toEqual(
      SignUpActions.postSignUpComplete(),
    );
  });

  it('should be able to show a toast message when an error occurs', async () => {
    apiMock.onPost('/users').reply(422);

    sagaTester.dispatch(SignUpActions.postSignUpRequest());

    await sagaTester.waitFor(SignUpTypes.POST_SIGN_UP_COMPLETE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(toastrActions.add({
      type: 'error',
      message: 'As informações contidas no formulário estão inválidas.',
    }));

    expect(calledActions[2]).toEqual(
      SignUpActions.postSignUpComplete(),
    );
  });

  it('should be able to show a toast message when an error occurs', async () => {
    apiMock.onPost('/users').reply(500);

    sagaTester.dispatch(SignUpActions.postSignUpRequest());

    await sagaTester.waitFor(SignUpTypes.POST_SIGN_UP_COMPLETE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no servidor nesta requisição.',
    }));

    expect(calledActions[2]).toEqual(
      SignUpActions.postSignUpComplete(),
    );
  });
});
