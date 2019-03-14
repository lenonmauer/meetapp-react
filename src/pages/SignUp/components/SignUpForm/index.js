import React from 'react';

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
  handleBlur,
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
        <ValidationError>{errors.name}</ValidationError>
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
        <ValidationError>{errors.email}</ValidationError>
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
        <ValidationError>{errors.password}</ValidationError>
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
        <ValidationError>{errors.password_confirmation}</ValidationError>
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

export default SignUpForm;
