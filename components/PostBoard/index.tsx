import React, { useRef, useState } from 'react';
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
  parentNode: any;
  madimadi: madiType[];
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const index: React.FC<IProps> = ({ madimadi, parentNode }) => {
  const ref = useRef(null);
  const [isCursorOn, setCursorOn] = useState(false);

  const onMouseOver = (e: any) => {
    setCursorOn(true);
    if (e.nativeEvent.fromElement === parentNode.current) setCursorOn(true);
  };
  const onMouseOut = (e: any) => {
    if (e.nativeEvent.toElement === parentNode.current) setCursorOn(false);
  };

  return (
    <Container
      ref={ref}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {
        isCursorOn ?
          <ScrollBoard madimadi={madimadi}/> :
          <SwipeBoard madimadi={madimadi}/>
      }
    </Container>
  );
};

export default index;
