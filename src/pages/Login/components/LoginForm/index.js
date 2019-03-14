import React from 'react';

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
        {<ValidationError>{errors.email}</ValidationError>}
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
        {<ValidationError>{errors.password}</ValidationError>}
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

export default LoginForm;
