import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 35px;
  width: 900px;
  margin: 0 auto;
`;

export const MeetupSection = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const MeetupWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    margin-right: 15px;
  }

  & > div:last-child {
    margin-right: 0px;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 14px;
`;
