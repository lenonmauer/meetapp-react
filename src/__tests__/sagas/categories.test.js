import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';
import rootSaga from '../../store/sagas/index';

import {
  CategoriesActions,
  CategoriesTypes,
} from '../../store/ducks/categories';

const apiMock = new MockAdapter(api.axiosInstance);

describe('Categories Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);
  });

  it('should fetch categories from api', async () => {
    const fixture = [
      {
        id: 'front-end',
        name: 'Front-end',
      },
      {
        id: 'back-end',
        name: 'Back-end',
      },
      {
        id: 'mobile',
        name: 'Mobile',
      },
      {
        id: 'dev-ops',
        name: 'DevOps',
      },
      {
        id: 'gestao',
        name: 'Gestão',
      },
      {
        id: 'marketing',
        name: 'Marketing',
      },
    ];

    apiMock.onGet('/categories').reply(200, fixture);

    sagaTester.dispatch(CategoriesActions.getCategoriesRequest());

    await sagaTester.waitFor(CategoriesTypes.GET_CATEGORIES_SUCCESS);

    expect(sagaTester.getLatestCalledAction()).toEqual(
      CategoriesActions.getCategoriesSuccess(fixture),
    );
  });

  it('should fail if response is not ok', async () => {
    apiMock.onGet('/categories').reply(400, {});

    sagaTester.dispatch(CategoriesActions.getCategoriesRequest());

    await sagaTester.waitFor(CategoriesTypes.GET_CATEGORIES_FAILURE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(
      CategoriesActions.getCategoriesFailure(),
    );

    expect(calledActions[2].type).toEqual('@ReduxToastr/toastr/ADD');
  });
});
