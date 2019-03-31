import { actions as toastrActions } from 'react-redux-toastr';

export default function handleError(
  { status, data },
  errorMessage = 'Ocorreu um erro no servidor nesta requisição.',
) {
  if (status === 400) {
    return toastrActions.add({
      type: 'error',
      message: data.error,
    });
  }
  if (status === 422) {
    return toastrActions.add({
      type: 'error',
      message: 'As informações contidas no formulário estão inválidas.',
    });
  }
  if (status !== 401) {
    return toastrActions.add({
      type: 'error',
      message: errorMessage,
    });
  }

  return null;
}
