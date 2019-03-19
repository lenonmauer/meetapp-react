import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { SignUpActions } from '../../store/ducks/signup';

import validationSchema from './validationSchema';

import LogoImg from '../../../../assets/images/logo.svg';

import {
  Input, InputLabel, Spinner, Button, ValidationError,
} from '../../components';

import {
  Container, Form, InputWrapper, AccountLink,
} from './styles';

const SignUp = ({
  signupLoading, values, handleChange, handleSubmit, errors,
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
        signupLoading
          ? <Spinner />
          : <Button type="submit">Criar conta</Button>
      }

      <AccountLink to="/login">Já tenho uma conta</AccountLink>
    </Form>
  </Container>
);

SignUp.propTypes = {
  signupLoading: PropTypes.bool.isRequired,
  postSignUpRequest: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    password_confirmation: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  signupLoading: state.signup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(SignUpActions, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues: ({ values }) => values
      || {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },

    validationSchema,

    validateOnChange: false,
    validateOnBlur: false,

    handleSubmit: (values, { props }) => props.postLoginRequest(values),
  }),
)(SignUp);
