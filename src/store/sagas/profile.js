import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Creators as ProfileActions } from '../ducks/profile';

export function* getProfile() {
  const response = yield call(api.get, '/profile');

  if (response.ok) {
    yield put(ProfileActions.getProfileSuccess(response.data));
  }
  else {
    toast.error('Ocorreu em erro ao tentar buscar os dados do seu perfil.');
  }

  yield put(ProfileActions.getProfileComplete());
}

export function* setPreferences(action) {
  const response = yield call(api.put, '/user-categories', action.data);

  if (!response.ok) {
    toast.error('Ocorreu em erro ao tentar alterar as preferências.');
  }
  else {
    yield put(push('/dashboard'));
    yield put(ProfileActions.setPreferencesSuccess(response.data));
    toast.success('Preferências alteradas.');
  }

  yield put(ProfileActions.setPreferencesComplete(response.data));
}

export function* setProfile(action) {
  const response = yield call(api.put, '/users', action.data);

  if (!response.ok) {
    if (response.status === 400) {
      toast.error(response.data[0].message);
    }
    else {
      toast.error('Ocorreu em erro ao tentar alterar o perfil');
    }
  }
  else {
    yield put(push('/dashboard'));
    yield put(ProfileActions.setProfileSuccess(response.data));
    toast.success('Perfil alterado.');
  }

  yield put(ProfileActions.setProfileComplete(response.data));
}
