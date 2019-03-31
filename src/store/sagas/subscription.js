import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import handleError from './error-handler';

import { SubscriptionActions } from '../ducks/subscription';

export function* subscribe(action) {
  const response = yield call(api.post, '/subscriptions', { meetup_id: action.id });

  if (response.ok) {
    yield put(
      toastrActions.add({
        type: 'success',
        message: 'Inscrição realizada.',
      }),
    );

    action.callback();
  }
  else {
    yield put(handleError(response));
  }

  yield put(SubscriptionActions.postSubscriptionComplete());
}
