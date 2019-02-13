import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LogoIcon from '../../assets/images/logo-white.svg';

export const Container = styled.div`
  display:  ${props => (props.show ? 'flex' : 'none')};
  height: 80px;
  background: #E5556E;
`;

export const Brand = styled.div`
  background: #E5556E url(${LogoIcon}) no-repeat center;
  height: 80px;
  width: 80px;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const NavigationLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  font-size:16px;
  padding: 1px 25px;
`;

export const MenuRightWrapper = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
