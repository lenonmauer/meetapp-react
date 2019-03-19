import React from 'react';
import PropTypes from 'prop-types';



const SignUpForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  loading,
}) => (

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
