import { actions as toastrActions } from 'react-redux-toastr';
import handleError from '../../store/sagas/error-handler';

describe('Saga Error Handler', () => {
  it('should show a toast with a message sent from server when response status is 400', () => {
    const response = {
      status: 400,
      data: {
        error: 'An error occurs',
      },
    };

    const error = handleError(response);

    expect(error).toEqual(
      toastrActions.add({
        type: 'error',
        message: response.data.error,
      }),
    );
  });

  it('should show a toast with a default message when response status is 422', () => {
    const response = {
      status: 422,
    };

    const error = handleError(response);

    expect(error).toEqual(
      toastrActions.add({
        type: 'error',
        message: 'As informações contidas no formulário estão inválidas.',
      }),
    );
  });

  it('should show a toast with a custom message when response status is 500', () => {
    const response = {
      status: 500,
    };

    const error = handleError(response, 'Error');

    expect(error).toEqual(
      toastrActions.add({
        type: 'error',
        message: 'Error',
      }),
    );
  });

  it('should return null when response is 401', () => {
    const response = {
      status: 401,
    };

    const error = handleError(response);

    expect(error).toEqual(null);
  });
});
