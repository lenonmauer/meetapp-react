import React from 'react';
import PropTypes from 'prop-types';

import LogoImg from '../../../../assets/images/logo.svg';

import {
  Input, InputLabel, Spinner, Button, ValidationError,
} from '../../../../components';

import {
  Container, Form, InputWrapper, AccountLink,
} from './styles';

const LoginForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  loading,
}) => (
  <Container>
    <Form onSubmit={handleSubmit} autoComplete="off">
      <img src={LogoImg} alt="logo" />

      <InputWrapper>
        <InputLabel>Email</InputLabel>
        <Input
          type="text"
          placeholder="Digite seu e-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          autoFocus
        />
        <ValidationError when={!!errors.email} message={errors.email} />
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

      {
        loading
          ? <Spinner />
          : <Button type="submit">Entrar</Button>
      }

      <AccountLink to="/signup">Criar conta grátis</AccountLink>
    </Form>
  </Container>
);

LoginForm.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
