import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Checkbox = ({
  id, value, onChange, children, checked,
}) => (
  <Container>
    <label htmlFor={id}>
      {children}
      <input id={id} type="checkbox" onChange={onChange} value={value} checked={checked} />
      <span />
    </label>
  </Container>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Checkbox;
