import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import handleError from './error-handler';

import { CategoriesActions } from '../ducks/categories';

export function* getCategories() {
  const response = yield call(api.get, '/categories');

  if (response.ok) {
    yield put(CategoriesActions.getCategoriesSuccess(response.data));
  }
  else {
    yield put(handleError(response, 'Ocorreu um erro ao buscar as categorias.'));
    yield put(CategoriesActions.getCategoriesFailure());
  }
}
