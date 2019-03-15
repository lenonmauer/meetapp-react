import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const ValidationError = ({ when, message }) => when && <Container>{message}</Container>;

ValidationError.propTypes = {
  when: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default ValidationError;
