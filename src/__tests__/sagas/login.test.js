import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import { push } from 'connected-react-router';
import api from '../../services/api';
import rootSaga from '../../store/sagas';

import {
  LoginActions,
  LoginTypes,
} from '../../store/ducks/login';

const apiMock = new MockAdapter(api.axiosInstance);

describe('Login Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);
  });

  it('should be able to authenticate the user and redirect to preferences if it is the user\'s first login', async () => {
    const fixture = {
      token: 'e2E6IDJ9',
      first_login: true,
    };

    apiMock.onPost('/login').reply(200, fixture);

    sagaTester.dispatch(LoginActions.postLoginRequest());

    await sagaTester.waitFor(LoginTypes.POST_LOGIN_SUCCESS);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(
      LoginActions.postLoginSuccess(),
    );

    expect(calledActions[2]).toEqual(
      push('/preferences'),
    );
  });

  it('should be able to authenticate the user and redirect to dashboard if it is not the user\'s first login', async () => {
    const fixture = {
      token: 'e2E6IDJ9',
      first_login: false,
    };

    apiMock.onPost('/login').reply(200, fixture);

    sagaTester.dispatch(LoginActions.postLoginRequest());

    await sagaTester.waitFor(LoginTypes.POST_LOGIN_SUCCESS);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(
      LoginActions.postLoginSuccess(),
    );

    expect(calledActions[2]).toEqual(
      push('/dashboard'),
    );
  });

  it('should fail if response is not ok', async () => {
    apiMock.onPost('/login').reply(400, {});

    sagaTester.dispatch(LoginActions.postLoginRequest());

    await sagaTester.waitFor(LoginTypes.POST_LOGIN_FAILURE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1].type).toEqual('@ReduxToastr/toastr/ADD');

    expect(calledActions[2]).toEqual(
      LoginActions.postLoginFailure(),
    );
  });
});
