import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import handleError from './error-handler';

import { UploadActions } from '../ducks/upload';

export function* doUpload(action) {
  const formData = new FormData();

  formData.append('photo', action.data);

  const response = yield call(api.post, '/upload', formData);

  if (response.ok) {
    yield put(UploadActions.uploadSuccess(response.data));
  }
  else {
    yield put(handleError(response, 'Ocorreu um erro no upload do arquivo.'));
    yield put(UploadActions.uploadFailure());
  }
}
