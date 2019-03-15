import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  categories: Yup.array()
    .required('Marque pelo menos uma categoria.'),
});

export default validationSchema;
