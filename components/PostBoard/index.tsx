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
interface ContainerType {
  opacity: number;
}

const Container = styled.div<ContainerType>`
  display: flex;
  width: 100%;
  opacity: ${props => props.opacity};
`;

const index: React.FC<IProps> = ({ madimadi, pageHeight }) => {
  const [isCursorOver, setCursorOver] = useState(false);
  const [opacity, setOpacity] = useState<number>(1);

  const fadeInAnimation = (opacity: number) => {
    if (opacity >= 1) return;
    let opacityLevel = opacity + 0.2;
    setTimeout(() => fadeInAnimation(opacityLevel), 70);
    setOpacity(opacityLevel);
  };
  const fadeOutAnimation = (opacity: number) => {
    let opacityLevel = opacity - 0.2;

    if (opacityLevel <= 0) {
      setOpacity(1);
      setCursorOver(true);
      return;
    }
    setTimeout(() => fadeOutAnimation(opacityLevel), 40);
    setOpacity(opacityLevel);
  };
  const onMouseLeave = () => {
    setCursorOver(false);
    fadeInAnimation(0);
  };
  const onMouseEnter = () => fadeOutAnimation(opacity);

  return (
    <Container
      opacity={opacity}
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
