import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import handleError from './error-handler';

import { ProfileActions } from '../ducks/profile';

export function* getProfile() {
  const response = yield call(api.get, '/profile');

  if (response.ok) {
    yield put(ProfileActions.getProfileSuccess(response.data));
  }
  else {
    yield put(handleError(response));
  }

  yield put(ProfileActions.getProfileComplete());
}

export function* setPreferences(action) {
  const response = yield call(api.put, '/user-categories', action.data);

  if (response.ok) {
    yield put(
      toastrActions.add({
        type: 'success',
        message: 'Preferências alteradas.',
      }),
    );
    yield put(ProfileActions.setPreferencesSuccess(response.data));
    yield put(push('/dashboard'));
  }
  else {
    yield put(handleError(response));
  }

  yield put(ProfileActions.setPreferencesComplete());
}

export function* setProfile(action) {
  const response = yield call(api.put, '/users', action.data);

  if (response.ok) {
    yield put(
      toastrActions.add({
        type: 'success',
        message: 'Perfil alterado.',
      }),
    );
    yield put(ProfileActions.setProfileSuccess(response.data));
    yield put(push('/dashboard'));
  }
  else {
    yield put(handleError(response));
  }

  yield put(ProfileActions.setProfileComplete());
}
