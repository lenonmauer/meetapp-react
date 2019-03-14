import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Este campo é obrigatório.'),
  email: Yup.string()
    .email('Endereço de e-mail inválido.')
    .required('Este campo é obrigatório.'),
  password: Yup.string()
    .required('Este campo é obrigatório.')
    .min(6, 'A senha deve conter no mínimo ${min} caracteres.'),
  password_confirmation: Yup.string()
    .required('Este campo é obrigatório.')
    .oneOf([
      Yup.ref('password'),
      null,
    ], 'As senhas não correspondem.'),
});

export default validationSchema;
