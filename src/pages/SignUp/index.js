import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SignUpActions } from '../../store/ducks/signup';

import {
  Input, InputLabel, Spinner, Button,
} from '../../components';

import LogoImg from '../../assets/images/logo.svg';

import {
  Container, Form, InputWrapper, AccountLink,
} from './styles';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.props.postSignUpRequest(this.state);
  }

  render() {
    const { loading } = this.props.signup;

    return (
      <Container>
        <Form onSubmit={this.onSubmit} autoComplete="off">
          <img src={LogoImg} alt="logo" />

          <InputWrapper>
            <InputLabel>Nome</InputLabel>
            <Input
              type="text"
              placeholder="Digite seu nome"
              name="name"
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </InputWrapper>

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
            loading ? <Spinner /> : <Button type="submit">Criar conta</Button>
          }

          <AccountLink to="/login">Já tenho uma conta</AccountLink>
        </Form>
      </Container>
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  postSignUpRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  signup: state.signup,
});

const mapDispatchToProps = dispatch => bindActionCreators(SignUpActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
