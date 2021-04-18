import React from 'react';
import styled from 'styled-components';
import PostBox from './PostBox';

interface madiType {
  dateNumber: number;
  index: number;
  authorObj: any;
  created: string;
  contents: string;
  source: string;
  like: number;
  commentIndex: number[];
}
interface madimadiType {
  currentPostData: any[] | madiType[];
  waitingData: any[] | madiType[];
  recycleData: any[] | madiType[];
}
interface IProps {
  boardData: madimadiType;
  setBoardData: (...any: any) => any;
  pageHeight: number;
  boxHeight: number;
}
interface ContainerType {
  height: number;
}

const Container = styled.div<ContainerType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: ${props => `${props.height - 30}px`};
  overflow: scroll;
  overscroll-behavior-y: none;
`;

const ScrollBoard: React.FC<IProps> = ({ boardData, pageHeight, boxHeight }) => {
  return (
    <Container height={pageHeight}>
      {
        <></>
      }
    </Container>
  );
};

export default ScrollBoard;
