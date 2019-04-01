import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Endereço de e-mail inválido.')
    .required('Este campo é obrigatório.'),
  password: Yup.string()
    .required('Este campo é obrigatório.')
    /* eslint-disable-next-line */
    .min(6, 'A senha deve conter no mínimo ${min} caracteres.'),
});

export default validationSchema;
