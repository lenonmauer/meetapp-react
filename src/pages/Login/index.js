import React, { Component } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogoImg from '../../assets/images/logo.svg';

import {
  Button, Input, InputLabel, Spinner,
} from '../../components';

import { Creators as LoginActions } from '../../store/ducks/login';

import {
  Container, Form, InputWrapper, AccountLink,
} from './styles';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  componentWillMount() {
    const { logged } = this.props.login;

    if (logged === true) {
      push('/dashboard');
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.postLoginRequest(this.state);
  }

  render() {
    const { loading } = this.props.login;

    return (
      <Container>
        <Form onSubmit={this.onSubmit} autoComplete="off">
          <img src={LogoImg} alt="logo" />

          <InputWrapper>
            <InputLabel>Email</InputLabel>
            <Input
              type="text"
              placeholder="Digite seu e-mail"
              name="email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Senha</InputLabel>
            <Input
              type="password"
              placeholder="Digite sua senha secreta"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </InputWrapper>

          {
            loading ? <Spinner /> : <Button type="submit">Entrar</Button>
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
};

const mapStateToProps = state => ({
  login: state.login,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
