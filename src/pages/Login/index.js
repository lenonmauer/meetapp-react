import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { LoginActions } from '../../store/ducks/login';

import validationSchema from './validationSchema';

import LogoImg from '../../assets/images/logo.svg';

import {
  Input, InputLabel, Spinner, Button, ValidationError,
} from '../../components';

import {
  Container, Form, InputWrapper, AccountLink,
} from './styles';

class Login extends Component {
  componentDidMount() {
    const { logged } = this.props.login;

    if (logged === true) {
      this.props.push('/dashboard');
    }
  }

  render() {
    const {
      handleChange, values, handleSubmit, errors, login: { loading },
    } = this.props;

    return (
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
  }
}

Login.propTypes = {
  login: PropTypes.shape({
    logged: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  postLoginRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...LoginActions, push }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues: ({ values }) => values
      || {
        email: '',
        password: '',
      },

    validationSchema,

    validateOnChange: false,
    validateOnBlur: false,

    handleSubmit: (values, { props }) => props.postLoginRequest(values),
  }),
)(Login);
