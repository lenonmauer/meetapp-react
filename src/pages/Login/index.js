import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LoginActions } from '../../store/ducks/login';

import LoginContainerForm from './components/LoginForm';
import validationSchema from './validationSchema';

class Login extends Component {
  state = {
    submitDisabled: false,
  }

  componentWillMount() {
    const { logged } = this.props.login;

    if (logged === true) {
      push('/dashboard');
    }
  }

  render() {
    const { loading } = this.props.login;
    const { submitDisabled } = this.state;

    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => this.props.postLoginRequest(values)}
        render={formikProps => (
          <LoginContainerForm
            {...formikProps}
            submitDisabled={submitDisabled}
            loading={loading}
          />
        )}
      />
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
