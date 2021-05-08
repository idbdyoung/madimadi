import React, { useState } from 'react';
import styled from 'styled-components';

import ScrollBoard from './ScrollBoard';
import SwipeBoard from './SwipeBoard';

import { madiType } from '../../types/madi';

interface madimadiType {
  index: number,
  currentPostData: any[] | madiType[];
  waitingData: any[] | madiType[];
  recycleData: any[] | madiType[];
}
interface IProps {
  madimadi: madimadiType;
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
  const [boardData, setBoardData] = useState(madimadi);

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
            boardData={boardData}
            setBoardData={setBoardData}
            pageHeight={pageHeight}
            boxHeight={boxHeight}
          /> :
          <SwipeBoard
            boardData={boardData}
            setBoardData={setBoardData}
            setBoxHeight={setBoxHeight}
          />
      }
    </Container>
  );
};

export default index;
