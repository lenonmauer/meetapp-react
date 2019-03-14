import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 420px;
  width: 270px;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountLink = styled(Link)`
  text-decoration: none;
  color: #687575;
  text-align: center;
`;
