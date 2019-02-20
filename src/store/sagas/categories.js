import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import { CategoriesActions } from '../ducks/categories';

export function* getCategories() {
  const response = yield call(api.get, '/categories');

  if (response.ok) {
    yield put(CategoriesActions.getCategoriesSuccess(response.data));
  }
  else {
    yield put(CategoriesActions.getCategoriesFailure());

    yield put(toastrActions.add({
      type: 'error',
      message: 'Ocorreu em erro ao buscar as categorias.',
    }));
  }
}
