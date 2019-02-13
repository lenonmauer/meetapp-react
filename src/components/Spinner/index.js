import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Spinner = ({ marginTop }) => <Container marginTop={marginTop} />;

Spinner.propTypes = {
  marginTop: PropTypes.number.isRequired,
};

export default Spinner;
