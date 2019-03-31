import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import rootSaga from '../../store/sagas';
import { mockFormDataAppend } from '../../__mocks__/FormData';

import { UploadActions, UploadTypes } from '../../store/ducks/upload';

const apiMock = new MockAdapter(api.axiosInstance);

describe('Upload Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    mockFormDataAppend.mockClear();
    sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);
  });

  it('should be able to do uploads', async () => {
    const fixture = {
      name: 'file.jpg',
    };

    apiMock.onPost('/upload').reply(200, fixture);

    sagaTester.dispatch(UploadActions.uploadRequest(fixture));

    await sagaTester.waitFor(UploadTypes.UPLOAD_SUCCESS);

    expect(mockFormDataAppend).toHaveBeenCalledWith('photo', fixture);

    expect(sagaTester.getLatestCalledAction()).toEqual(UploadActions.uploadSuccess(fixture));
  });

  it('should show a toast message when an server error occurs', async () => {
    const fixture = {
      error: 'Invalid file',
    };

    apiMock.onPost('/upload').reply(500, fixture);

    sagaTester.dispatch(UploadActions.uploadRequest(fixture));

    await sagaTester.waitFor(UploadTypes.UPLOAD_FAILURE);

    const calledActions = sagaTester.getCalledActions();

    expect(calledActions[1]).toEqual(
      toastrActions.add({
        type: 'error',
        message: 'Ocorreu um erro no upload do arquivo.',
      }),
    );

    expect(calledActions[2]).toEqual(UploadActions.uploadFailure(fixture));
  });
});
