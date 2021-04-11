import React, { useState } from 'react';
import styled from 'styled-components';

import ScrollBoard from './ScrollBoard';
import SwipeBoard from './SwipeBoard';

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

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const index: React.FC<IProps> = ({ madimadi, pageHeight }) => {
  const [isCursorOver, setCursorOver] = useState(false);

  const onMouseLeave = () => (setCursorOver(false));
  const onMouseEnter = () => (setCursorOver(true));

  return (
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {
        isCursorOver ?
          <ScrollBoard madimadi={madimadi} pageHeight={pageHeight}/> :
          <SwipeBoard madimadi={madimadi}/>
      }
    </Container>
  );
};

export default index;
