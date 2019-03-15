import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  InputLabel, Button, ValidationError, Spinner, Checkbox,
} from '../../../../components';

import {
  CategoriesWrapper,
} from './styles';


const PreferencesForm = ({
  values,
  handleSubmit,
  errors,
  loading,
  categories,
  setFieldValue,
}) => {
  const handleCheckboxChange = (options, field, value) => {
    if (options.find(option => option === value)) {
      setFieldValue(field, options.filter(cat => cat !== value));
    }
    else {
      setFieldValue(field, [...options, value]);
    }
  };

  return (
    <Fragment>
      <InputLabel>Preferências</InputLabel>

      <CategoriesWrapper>
        {categories.map(category => (
          <Checkbox
            key={category.id}
            id={`category-${category.id}`}
            value={category.id}
            checked={values.categories.includes(category.id)}
            onChange={() => handleCheckboxChange(values.categories, 'categories', category.id)}
          >
            {category.name}
          </Checkbox>
        ))}

        <ValidationError when={!!errors.categories} message={errors.categories} />
      </CategoriesWrapper>

      {
      loading
        ? <Spinner />
        : <Button type="button" onClick={handleSubmit}>Continuar</Button>
    }
    </Fragment>
  );
};


PreferencesForm.propTypes = {
  values: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default PreferencesForm;
