import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import handleError from './error-handler';

import { MeetupActions } from '../ducks/meetup';

export function* newMeetup(action) {
  const response = yield call(api.post, '/meetups', action.data);

  if (response.ok) {
    yield put(
      toastrActions.add({
        type: 'success',
        message: 'Meetup Cadastrado com Sucesso.',
      }),
    );
    action.callback();
  }
  else {
    yield put(handleError(response));
  }

  yield put(MeetupActions.postMeetupComplete());
}

export function* getMeetups() {
  const response = yield call(api.get, '/meetups');

  if (response.ok) {
    yield put(MeetupActions.getMeetupsSuccess(response.data));
  }
  else {
    yield put(handleError(response));
  }

  yield put(MeetupActions.getMeetupsComplete());
}

export function* getMeetup(action) {
  const response = yield call(api.get, `/meetups/${action.id}`);

  if (response.ok) {
    yield put(MeetupActions.getMeetupSuccess(response.data));
  }
  else {
    yield put(handleError(response));
  }

  yield put(MeetupActions.getMeetupComplete());
}

export function* searchMeetups(action) {
  const response = yield call(api.get, `/meetups?search=${action.search}`);

  if (response.ok) {
    yield put(MeetupActions.searchMeetupsSuccess(response.data));
  }
  else {
    yield put(handleError(response));
  }

  yield put(MeetupActions.searchMeetupsComplete());
}
