import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import { UploadActions } from '../ducks/upload';

export function* doUpload(action) {
  const formData = new FormData();

  formData.append('photo', action.data);

  const response = yield call(api.post, '/upload', formData);

  if (response.ok) {
    return yield put(UploadActions.uploadSuccess(response.data));
  }

  if (response.status === 400) {
    yield put(toastrActions.add({
      type: 'error',
      message: response.data[0].message,
    }));
  }
  else {
    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro no upload do arquivo.',
    }));
  }

  return yield put(UploadActions.uploadFailure());
}
