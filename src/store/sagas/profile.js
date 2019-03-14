import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import { ProfileActions } from '../ducks/profile';

export function* getProfile() {
  const response = yield call(api.get, '/profile');

  if (response.ok) {
    yield put(ProfileActions.getProfileSuccess(response.data));
  }
  else {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro ao tentar buscar os dados do seu perfil.',
    }));
  }

  return yield put(ProfileActions.getProfileComplete());
}

export function* setPreferences(action) {
  if (!action.data.categories.length) {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Selecione pelo menos uma categoria.',
    }));
  }
  else {
    const response = yield call(api.put, '/user-categories', action.data);

    if (!response.ok) {
      yield put(toastrActions.add({
        type: 'error',
        message: 'Ocorreu em erro ao tentar alterar as preferências.',
      }));
    }
    else {
      yield put(ProfileActions.setPreferencesSuccess(response.data));
      yield put(toastrActions.add({
        type: 'success',
        message: 'Preferências alteradas.',
      }));
      yield put(push('/dashboard'));
    }
  }

  return yield put(ProfileActions.setPreferencesComplete());
}

export function* setProfile(action) {
  if (!action.data.categories.length) {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Selecione pelo menos uma categoria.',
    }));
  }
  else {
    const response = yield call(api.put, '/users', action.data);

    if (!response.ok) {
      if (response.status === 400) {
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
          message: 'Ocorreu em erro ao tentar alterar o perfil.',
        }));
      }
    }
    else {
      yield put(ProfileActions.setProfileSuccess(response.data));
      yield put(toastrActions.add({
        type: 'success',
        message: 'Perfil alterado.',
      }));
      yield put(push('/dashboard'));
    }
  }

  return yield put(ProfileActions.setProfileComplete());
}
