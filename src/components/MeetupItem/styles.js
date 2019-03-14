import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 160px;
  width: 290px;
  background-color: #fff;
  border-radius: 5px;
`;

export const Thumbnail = styled.img`
  height: 90px;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
`;

export const Content = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  color: #222;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const MembersCount = styled.span`
  color: #9999;
  font-size: 14px;
`;

export const Button = styled(Link)`
  border-radius: 50%;
  border: none;
  background: #E5556E;
  padding: 10px;
`;

export const Icon = styled.i`
  color: #fff;
  font-size: 18px;
`;
