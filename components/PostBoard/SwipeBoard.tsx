import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { handleBoardDataWhenChangeMode } from '../../lib/utils';

import { useSelector } from '../../store';
import { PostBoardAction } from '../../store/postBoard';
import { SwipeDataState } from '../../types/reduxState';

import PostItem from './PostItem';
import PostBoardTitle from './PostBoardTitle';

const SwipeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none !important;
  };
`;
const PostBoardTitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  z-index: 993;
  margin-bottom: 2px;
  box-shadow: 0 5px 5px -5px rgba(0,0,0,0.25);
`;

interface SwipeContentsType {
  contentsY: number;
  contentsHeight: number;
}

const SwipeContents = styled.div.attrs<SwipeContentsType>((props) => ({
  style: {
    top: `${props.contentsY}px`,
    height: `${props.contentsHeight}px`,
  },
}))<SwipeContentsType>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 990;
`;

const SwipeBoard: React.FC = () => {
  const dispatch = useDispatch();
  const postBoard = useSelector(state => state.postBoard);
  const swipeData = postBoard.swipeData;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const isFirstRun = useRef<boolean>(true);
  const [contentsY, setContentsY] = useState(0);
  const [swipe1px, setSwipe1px] = useState(true);

  const onClickChangeScrollMode = () => {
    if (!swipeData.currentData.length) return;
    const handledBoardData = handleBoardDataWhenChangeMode(postBoard);
    dispatch(PostBoardAction.setData(handledBoardData));
    dispatch(PostBoardAction.changeBoardMode());
  };
  const modifyDataToSwipe = (swipeData: SwipeDataState) => {
    const { currentData, waitingData, recycledData } = swipeData;
    const splicedCurrentData = currentData.splice(0, 1);
    const splicedWaitingData = waitingData.splice(0, 1);
    currentData.push(splicedWaitingData[0]);
    recycledData.push(splicedCurrentData[0]);

    return { ...swipeData };
  };
  const swipeBoard = () => {
    if (Math.abs(contentsY) > postBoard.postItemHeight) {
      return resetSwipeBoard();
    }
    const newContentsY = contentsY - 3;
    setContentsY(newContentsY);
    setSwipe1px(!swipe1px);
  };
  const resetSwipeBoard = () => {
    setContentsY(0);
    const modifiedSwipeData = modifyDataToSwipe(swipeData);

    if (!swipeData.waitingData.length) {
      return dispatch(PostBoardAction.setFetch());
    }
    dispatch(PostBoardAction.setFocusedDataIndex(modifiedSwipeData.currentData[0].index));
    dispatch(PostBoardAction.setData(modifiedSwipeData));
  };

  useEffect(() => {
    if (containerRef.current) {
      dispatch(PostBoardAction.setPostItemHeight(containerRef.current.offsetHeight / 3));
    }
  }, [containerRef.current]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const animationId = requestAnimationFrame(swipeBoard);

    return () => cancelAnimationFrame(animationId);
  }, [swipe1px]);

  useEffect(() => {
    const timerId = setTimeout(() => setSwipe1px(!swipe1px), 3000);

    return () => clearTimeout(timerId);
  }, [swipeData]);

  return (
    <>
      <PostBoardTitleContainer>
        <PostBoardTitle/>
      </PostBoardTitleContainer>
      <SwipeContainer
        ref={containerRef}
        onClick={onClickChangeScrollMode}
      >
        <SwipeContents
          ref={contentsRef}
          contentsY={contentsY}
          contentsHeight={postBoard.postItemHeight * 4}
        >
          {
            swipeData.currentData.map((data, key) => {
              return (
                <PostItem
                  key={key}
                  data={data}
                  height={postBoard.postItemHeight}
                />
              );
            })
          }
        </SwipeContents>
      </SwipeContainer>
    </>
  );
};

export default SwipeBoard;
