import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const Thumbnail = styled.img`
  max-width: 900px;
  max-height: 300px;
  margin-top: 40px;
  object-fit: cover;
`;

export const Content = styled.div`
  flex: 1;
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const MembersCount = styled.span`
  font-size: 18px;
  color: #999;
  margin-top: 5px;
`;

export const Description = styled.div`
  font-size: 16px;
  color: rgba(255,255,255, .8);
  margin-top: 15px;
`;

export const HeldIn = styled.span`
  font-size: 14px;
  color: #999;
  color: rgba(255,255,255, .8);
  margin-top: 30px;
`;

export const Location = styled.span`
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 20px;
`;

export const SubscriptMessage = styled.div`
  background: #60BB71;
  padding: 12px;
  border-radius: 20px;
  text-align: center;
`;
