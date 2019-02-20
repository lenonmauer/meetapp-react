import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
flex: 1;
padding-top: 35px;
width: 900px;
margin: 0 auto;
`;

export const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  background: #2F2D38;
  padding: 8px;
  border-radius: 4px;
  height: 40px;
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  height: 100%;
  padding: 8px;
`;

export const MeetupsContainer = styled.div`
  display: flex;
  flex-direction: column;
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
