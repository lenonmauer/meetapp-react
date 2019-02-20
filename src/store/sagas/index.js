import { all, takeLatest } from 'redux-saga/effects';

import { login } from './login';
import { signUp } from './signup';
import { getProfile, setPreferences, setProfile } from './profile';
import { getCategories } from './categories';
import { doUpload } from './upload';
import {
  newMeetup, getMeetups, getMeetup, searchMeetups,
} from './meetup';

import { LoginTypes } from '../ducks/login';
import { SignUpTypes } from '../ducks/signup';
import { ProfileTypes } from '../ducks/profile';
import { CategoriesTypes } from '../ducks/categories';
import { UploadTypes } from '../ducks/upload';
import { MeetupTypes } from '../ducks/meetup';

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.POST_LOGIN_REQUEST, login),
    takeLatest(SignUpTypes.POST_SIGN_UP_REQUEST, signUp),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile),
    takeLatest(ProfileTypes.SET_PREFERENCES_REQUEST, setPreferences),
    takeLatest(ProfileTypes.SET_PROFILE_REQUEST, setProfile),
    takeLatest(CategoriesTypes.GET_CATEGORIES_REQUEST, getCategories),
    takeLatest(UploadTypes.UPLOAD_REQUEST, doUpload),
    takeLatest(MeetupTypes.POST_MEETUP_REQUEST, newMeetup),
    takeLatest(MeetupTypes.GET_MEETUPS_REQUEST, getMeetups),
    takeLatest(MeetupTypes.GET_MEETUP_REQUEST, getMeetup),
    takeLatest(MeetupTypes.SEARCH_MEETUPS_REQUEST, searchMeetups),
  ]);
}
