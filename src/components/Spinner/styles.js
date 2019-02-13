import styled from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)};

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
`;
