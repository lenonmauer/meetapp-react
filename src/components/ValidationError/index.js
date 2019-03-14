import React from 'react';

import { Container } from './styles';

const ValidationError = ({ children }) => !!children && <Container>{children}</Container>;

export default ValidationError;
