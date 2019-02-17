import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { CategoriesActions } from '../ducks/categories';

export function* getCategories() {
  const response = yield call(api.get, '/categories');

  if (response.ok) {
    yield put(CategoriesActions.getCategoriesSuccess(response.data));
  }
  else {
    yield put(CategoriesActions.getCategoriesFailure());
    toast.error('Ocorreu em erro ao tentar as preferências.');
  }
}
