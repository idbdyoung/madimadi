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
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: magenta;
`;

const ScrollBoard: React.FC<IProps> = ({ madimadi }) => {
  return (
    <Container>
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
