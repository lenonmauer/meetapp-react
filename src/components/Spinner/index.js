import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Spinner = ({ marginTop }) => <Container marginTop={marginTop} />;

Spinner.defaultProps = {
  marginTop: null,
};

Spinner.propTypes = {
  marginTop: PropTypes.string,
};

export default Spinner;
