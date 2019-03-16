import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Form, InputWrapper,
} from './styles';

import {
  Button, Input, InputLabel, Checkbox, Spinner, ValidationError,
} from '../../../../components';

const ProfileForm = ({
  values,
  handleSubmit,
  handleChange,
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
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputLabel>Nome</InputLabel>
          <Input
            type="text"
            placeholder="Digite seu nome"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <ValidationError when={!!errors.name} message={errors.name} />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>Senha</InputLabel>
          <Input
            type="password"
            placeholder="Digite sua senha secreta"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <ValidationError when={!!errors.password} message={errors.password} />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>Confirmação da senha</InputLabel>
          <Input
            type="password"
            placeholder="Digite sua senha secreta novamente"
            name="password_confirmation"
            value={values.password_confirmation}
            onChange={handleChange}
          />
          <ValidationError when={!!errors.password_confirmation} message={errors.password_confirmation} />
        </InputWrapper>

        <div>
          <InputLabel>Preferências</InputLabel>

          <div>
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
          </div>
          <ValidationError when={!!errors.categories} message={errors.categories} />
        </div>

        {
          loading
            ? <Spinner />
            : <Button type="submit">Salvar</Button>
        }

      </Form>
    </Container>
  );
};

ProfileForm.propTypes = {
  values: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password_confirmation: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default ProfileForm;
