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
  background: yellow;
`;

const ScrollBoard: React.FC<IProps> = ({ madimadi, pageHeight }) => {
  return (
    <Container height={pageHeight}>
      {
        madimadi.map(madi => {
          return (
            <PostBox
              key={madi.index}
              madi={madi}
            />
          );
        })
      }
    </Container>
  );
};

export default ScrollBoard;
