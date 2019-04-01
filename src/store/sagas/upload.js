import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import handleError from './error-handler';

import { UploadActions } from '../ducks/upload';

export function* doUpload(action) {
  const formData = new FormData();
  const maxSize = 2 * 1024 * 1024;

  if (action.data.size > maxSize) {
    yield put(
      toastrActions.add({
        type: 'error',
        message: 'O tamanho máximo permitido para este arquivo é de 2mb',
      }),
    );
    return yield put(UploadActions.uploadFailure());
  }

  formData.append('photo', action.data);

  const response = yield call(api.post, '/upload', formData);

  if (response.ok) {
    yield put(UploadActions.uploadSuccess(response.data));
  }
  else {
    yield put(handleError(response, 'Ocorreu um erro no upload do arquivo.'));
    yield put(UploadActions.uploadFailure());
  }

  return true;
}
