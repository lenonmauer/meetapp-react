import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import { MeetupActions } from '../ducks/meetup';

export function* newMeetup(action) {
  const response = yield call(api.post, '/meetups', action.data);

  if (response.ok) {
    yield put(toastrActions.add({
      type: 'success',
      message: 'Meetup Cadastrado com Sucesso.',
    }));
    action.callback();
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

  yield put(MeetupActions.postMeetupComplete());
}

export function* getMeetups() {
  const response = yield call(api.get, '/meetups');

  if (response.ok) {
    yield put(MeetupActions.getMeetupsSuccess(response.data));
  }
  else {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no servidor nesta requisição.',
    }));
  }

  yield put(MeetupActions.getMeetupsComplete());
}

export function* getMeetup(action) {
  const response = yield call(api.get, `/meetups/${action.id}`);

  if (response.ok) {
    yield put(MeetupActions.getMeetupSuccess(response.data));
  }
  else {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no servidor nesta requisição.',
    }));
  }

  yield put(MeetupActions.getMeetupComplete());
}

export function* searchMeetups(action) {
  const response = yield call(api.get, `/meetups?search=${action.search}`);

  if (response.ok) {
    yield put(MeetupActions.searchMeetupsSuccess(response.data));
  }
  else {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no servidor nesta requisição.',
    }));
  }

  yield put(MeetupActions.searchMeetupsComplete());
}
