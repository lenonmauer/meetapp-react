import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import rootSaga from '../../store/sagas';

import {
  SubscriptionActions,
  SubscriptionTypes,
} from '../../store/ducks/subscription';

const apiMock = new MockAdapter(api.axiosInstance);

describe('Subscription Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);
  });

  it('should be able to subscribe the user', async () => {
    const callbackSpy = jest.fn();

    apiMock.onPost('/subscriptions').reply(200, {});

    sagaTester.dispatch(SubscriptionActions.postSubscriptionRequest(0, callbackSpy));

    await sagaTester.waitFor(SubscriptionTypes.POST_SUBSCRIPTION_COMPLETE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(toastrActions.add({
      type: 'success',
      message: 'Inscrição realizada.',
    }));

    expect(calledActions[2]).toEqual(
      SubscriptionActions.postSubscriptionComplete(),
    );

    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should be able to show a toast message when an error occurs', async () => {
    const fixture = {
      error: 'Error',
    };
    apiMock.onPost('/subscriptions').reply(400, fixture);

    sagaTester.dispatch(SubscriptionActions.postSubscriptionRequest());

    await sagaTester.waitFor(SubscriptionTypes.POST_SUBSCRIPTION_COMPLETE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(toastrActions.add({
      type: 'error',
      message: fixture.error,
    }));

    expect(calledActions[2]).toEqual(
      SubscriptionActions.postSubscriptionComplete(),
    );
  });

  it('should be able to show a toast message when an error occurs', async () => {
    const fixture = {
      error: 'Error',
    };
    apiMock.onPost('/subscriptions').reply(500, fixture);

    sagaTester.dispatch(SubscriptionActions.postSubscriptionRequest());

    await sagaTester.waitFor(SubscriptionTypes.POST_SUBSCRIPTION_COMPLETE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no servidor nesta requisição.',
    }));

    expect(calledActions[2]).toEqual(
      SubscriptionActions.postSubscriptionComplete(),
    );
  });
});
