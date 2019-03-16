import * as Yup from 'yup';
import { isDateTimeBR } from '../../custom-validations/datetime-br';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Este campo é obrigatório.'),
  description: Yup.string()
    .required('Este campo é obrigatório.'),
  date: Yup.string()
    .required('Este campo é obrigatório.')
    .test('datetimeBR', 'Esta data é inválida.', isDateTimeBR),
  photo: Yup.string()
    .nullable()
    .required('Este campo é obrigatório.'),
  localization: Yup.string()
    .required('Este campo é obrigatório.'),
  categories: Yup.array()
    .required('Este campo é obrigatório.'),
});

export default validationSchema;
