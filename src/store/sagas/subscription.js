import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import { SubscriptionActions } from '../ducks/subscription';

export function* subscribe(action) {
  const response = yield call(api.post, '/subscriptions', { meetup_id: action.id });

  if (response.ok) {
    yield put(toastrActions.add({
      type: 'success',
      message: 'Inscrição realizada.',
    }));

    action.callback();
  }
  else if (response.status === 400) {
    yield put(toastrActions.add({
      type: 'error',
      message: response.data[0].message,
    }));
  }
  else {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no servidor nesta requisição.',
    }));
  }

  yield put(SubscriptionActions.postSubscriptionComplete());
}
