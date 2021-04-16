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
interface IProps {
  madimadi: madiType[];
  pageHeight: number;
  boxHeight: number;
}
interface ContainerType {
  height: number;
}

const Container = styled.div<ContainerType>`
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: ${props => `${props.height - 30}px`};
  overflow: scroll;
  scroll-behavior: smooth;
  overscroll-behavior-y: none;
`;

const ScrollBoard: React.FC<IProps> = ({ madimadi, pageHeight, boxHeight }) => {
  return (
    <Container height={pageHeight}>
      {
        madimadi.map(madi => {
          return (
            <PostBox
              key={madi.index}
              madi={madi}
              boxHeight={boxHeight}
            />
          );
        })
      }
    </Container>
  );
};

export default ScrollBoard;
