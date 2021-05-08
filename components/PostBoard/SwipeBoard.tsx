import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { getMadi } from '../../lib/api/madi';

import TimeBox from '../TimeBox';
import PostBox from './PostBox';

import { madiType } from '../../types/madi';

interface madimadiType {
  index: number,
  currentPostData: any[] | madiType[];
  waitingData: any[] | madiType[];
  recycleData: any[] | madiType[];
}
interface IProps {
  boardData: madimadiType;
  setBoardData: (...any: any) => any;
  setBoxHeight: (...any: any) => any;
}
interface SwipeContentsType {
  contentsY: number;
  contentsHeight: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .madimadi-swipe-header {
    background: white;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    z-index: 998;
    box-shadow: 0 5px 5px -5px rgba(0,0,0,0.25);
    .madimadi-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;
      font-family: Noto Sans;
      font-size: 25px;
      font-style: normal;
      font-weight: 600;
    }
    .madimadi-time {
      padding-bottom: 20px;
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }
  }
  .madimadi-swipe-container {
    position: relative;
    flex: 1;
    .madimadi-swipe-contents::-webkit-scrollbar {
      display: none;
    }
  }
  .madimadi-swipe-footer {
    width: 100%;
    height: 30px;
    background: white;
    z-index: 998;
  }
`;
const SwipeContents = styled.div.attrs<SwipeContentsType>(props => ({
  style: {
    top: `${props.contentsY}px`,
    height: `${props.contentsHeight * 4}px`,
  },
}))<SwipeContentsType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SwipeBoard: React.FC<IProps> = ({ boardData, setBoardData, setBoxHeight }) => {
  const containerRef: any = useRef(null);
  const contentsRef: any = useRef(null);
  const [contentsHeight, setContentsHeight] = useState(0);
  const [contentsY, setContentsY] = useState(0);
  const [swipe, setSwipe] = useState(true);
  const [isFirstSwipe, setFirstSwipe] = useState(true);
  const [receiveLastData, setReceiveLastData] = useState(false);
  const [dataIndex, setDataIndex] = useState(boardData.index);

  const setNextBoardData = async () => {
    if (!boardData.waitingData.length && receiveLastData === false) {
      try {
        const { data } = await getMadi(dataIndex + 1);
        const { responseData, isLastData } = data;
        boardData.waitingData = responseData;

        if (isLastData === true) setReceiveLastData(true);
        setBoardData(boardData);
        setDataIndex(dataIndex + 1);
      } catch (e) {
        console.log(e);
      }
    } else if (!boardData.waitingData.length && receiveLastData === true) {
      boardData.waitingData = boardData.recycleData;
      boardData.recycleData = [];
      setBoardData(boardData);
    }
    const shownPostData = boardData.currentPostData.shift();
    boardData.recycleData.push(shownPostData);
    const firstWaitingData = boardData.waitingData.shift();
    boardData.currentPostData.push(firstWaitingData);
    setBoardData(boardData);
  };
  const resetSwipe = () => {
    const nodes = contentsRef.current.children;
    contentsRef.current.appendChild(nodes[0]);
    setTimeout(() => setSwipe(!swipe), 3000);
    setContentsY(-contentsHeight);
    setContentsY(0);
    setNextBoardData();
  };
  const swipeBoard = () => {
    if (Math.abs(contentsY) > contentsHeight) return resetSwipe();
    const location = contentsY - 1;
    setContentsY(location);
    setSwipe(!swipe);
  };

  useEffect(() => {
    setBoxHeight(containerRef.current.offsetHeight / 3);
    setContentsHeight(containerRef.current.offsetHeight / 3);

    return () => setContentsHeight(0);
  }, [containerRef.current, contentsHeight]);

  useEffect(() => {
    if (isFirstSwipe) {
      setTimeout(() => setFirstSwipe(false), 3000);
      return;
    }
    const timerId = setTimeout(swipeBoard, 0.002);

    return () => clearTimeout(timerId);
  }, [swipe, isFirstSwipe]);

  return (
    <Container>
      <div className='madimadi-swipe-header'>
        <div className='madimadi-title'>
          오늘의 한마디
        </div>
        <div className='madimadi-time'>
          <TimeBox />
        </div>
      </div>
      <div
        className='madimadi-swipe-container'
        ref={containerRef}
      >
        <SwipeContents
          ref={contentsRef}
          contentsHeight={contentsHeight}
          contentsY={contentsY}
        >
          {
            boardData.currentPostData.map((madi: madiType) => (
              <PostBox
                key={madi.index}
                madi={madi}
              />
            ))
          }
        </SwipeContents>
      </div>
      <div className='madimadi-swipe-footer'/>
    </Container>
  );
};

export default SwipeBoard;
