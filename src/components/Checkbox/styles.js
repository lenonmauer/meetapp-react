import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 10px;

  label {
    font-size: 18px;
    padding-left: 26px;
    position: relative;
    cursor: pointer;
  }

  label:hover span {
    opacity: 0.8;
  }

  input {
    opacity: 0;
    position: absolute;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background: #514C56;
    border-radius: 3px;
  }

  input:checked ~ span {
    background: #E5556E;
  }
`;
