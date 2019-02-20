import styled from 'styled-components';
import MaskedInput from 'react-text-mask';

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const FormGroup = styled.div`
  margin-bottom: 30px;
`;

export const Date = styled(MaskedInput)`
  background: #24202C;
  border: none;
  height: 24px;
  font-size: 18px;
  color: #fff;
  width: 100%;
`;
