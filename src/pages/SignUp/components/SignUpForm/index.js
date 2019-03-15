import React from 'react';
import PropTypes from 'prop-types';

import LogoImg from '../../../../assets/images/logo.svg';

import {
  Input, InputLabel, Spinner, Button, ValidationError,
} from '../../../../components';

import {
  Container, Form, InputWrapper, AccountLink,
} from './styles';

const SignUpForm = ({
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
        <InputLabel>Email</InputLabel>
        <Input
          type="text"
          placeholder="Digite seu e-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
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

      <InputWrapper>
        <InputLabel>Confirmação da Senha</InputLabel>
        <Input
          type="password"
          placeholder="Digite sua senha secreta novamente"
          name="password_confirmation"
          value={values.password_confirmation}
          onChange={handleChange}
        />
        <ValidationError
          when={!!errors.password_confirmation}
          message={errors.password_confirmation}
        />
      </InputWrapper>

      {
        loading
          ? <Spinner />
          : <Button type="submit">Criar conta</Button>
      }

      <AccountLink to="/login">Já tenho uma conta</AccountLink>
    </Form>
  </Container>
);

SignUpForm.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    password_confirmation: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SignUpForm;
