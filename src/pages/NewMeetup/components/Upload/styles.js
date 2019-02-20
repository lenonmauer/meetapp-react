import styled from 'styled-components';

export const DropContainer = styled.div`
  height: 80px;
  border: 1px dashed #48434E;
  border-radius: 4px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > i {
    color:  #48434E;
  }
`;

export const ThumbContainer = styled.div`
  display: flex;
  width: 300px;

  & > button {
    background: none;
    border: none;
    height: 24px;
  }

  & > button > i {
    color: #dadada;
    cursor: pointer;
    position: relative;
    top: 0;
  }
`;

export const Thumbnail = styled.img`
  height: 120px;
`;
