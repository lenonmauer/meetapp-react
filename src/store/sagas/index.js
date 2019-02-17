import { all, takeLatest } from 'redux-saga/effects';

import { login } from './login';
import { signUp } from './signup';
import { getProfile, setPreferences, setProfile } from './profile';
import { getCategories } from './categories';

import { LoginTypes } from '../ducks/login';
import { SignUpTypes } from '../ducks/signup';
import { ProfileTypes } from '../ducks/profile';
import { CategoriesTypes } from '../ducks/categories';

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.POST_LOGIN_REQUEST, login),
    takeLatest(SignUpTypes.POST_SIGN_UP_REQUEST, signUp),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile),
    takeLatest(ProfileTypes.SET_PREFERENCES_REQUEST, setPreferences),
    takeLatest(ProfileTypes.SET_PROFILE_REQUEST, setProfile),
    takeLatest(CategoriesTypes.GET_CATEGORIES_REQUEST, getCategories),
  ]);
}
