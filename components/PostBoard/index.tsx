import React, { useEffect, useState } from 'react';
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
  isScrollBoardOpen: boolean;
  setScrollBoardOpen: (...any: any) => any;
}
interface ContainerType {
  opacity: number;
}

const Container = styled.div<ContainerType>`
  display: flex;
  width: 100%;
  height: 100%;
  opacity: ${props => props.opacity};
`;

const index: React.FC<IProps> = ({ madimadi, pageHeight, isScrollBoardOpen, setScrollBoardOpen }) => {
  const [opacity, setOpacity] = useState<number>(1);
  const [boxHeight, setBoxHeight] = useState(0);

  const fadeInAnimation = (opacity: number) => {
    if (opacity >= 1) return;
    let opacityLevel = opacity + 0.2;
    setTimeout(() => fadeInAnimation(opacityLevel), 70);
    setOpacity(opacityLevel);
  };
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isScrollBoardOpen) return;
    fadeInAnimation(0);
    setScrollBoardOpen(true);
  };

  return (
    <Container
      opacity={opacity}
      onClick={onClick}
    >
      {
        isScrollBoardOpen ?
          <ScrollBoard
            madimadi={madimadi}
            pageHeight={pageHeight}
            boxHeight={boxHeight}
          /> :
          <SwipeBoard
            madimadi={madimadi}
            setBoxHeight={setBoxHeight}
          />
      }
    </Container>
  );
};

export default index;
