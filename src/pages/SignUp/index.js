import React, { Component } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SignUpActions } from '../../store/ducks/signup';

import SignUpForm from './components/SignUpForm';
import validationSchema from './validationSchema';

const SignUp = ({ signup: { loading }, postSignUpRequest }) => (
  <Formik
    initialValues={{
      name: '', email: '', password: '', password_confirmation: '',
    }}
    validationSchema={validationSchema}
    validateOnBlur={false}
    validateOnChange={false}
    onSubmit={values => postSignUpRequest(values)}
    render={formikProps => (
      <SignUpForm
        {...formikProps}
        loading={loading}
      />
    )}
  />
);

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
