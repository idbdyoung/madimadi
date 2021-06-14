import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useSelector } from '../../store';
import { PostBoardAction } from '../../store/postBoard';
import { SwipeDataState } from '../../types/reduxState';
import { handleBoardDataWhenChangeMode } from '../../lib/utils/postBoard';

import PostItem from './PostItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
  .swipe-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none !important;
    };
  }
`;

interface SwipeContentsType {
  contentsTop: number;
  contentsHeight: number;
}

const SwipeContents = styled.div.attrs<SwipeContentsType>((props) => ({
  style: {
    top: `${props.contentsTop}px`,
    height: `${props.contentsHeight}px`,
  },
}))<SwipeContentsType>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  z-index: 990;
  cursor: pointer;
`;

const SwipeBoard: React.FC = () => {
  const dispatch = useDispatch();
  const postBoard = useSelector(state => state.postBoard);
  const swipeData = postBoard.swipeData;
  const contentsRef = useRef<HTMLDivElement>(null);
  const isFirstRun = useRef<boolean>(true);
  const [contentsTop, setContentsTop] = useState(0);
  const [swipe1px, setSwipe1px] = useState(true);

  const onClickChangeToScrollMode = () => {
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
    if (Math.abs(contentsTop) > postBoard.postItemHeight) {
      return resetSwipeBoard();
    }
    setContentsTop(contentsTop - 3);
    setSwipe1px(!swipe1px);
  };
  const resetSwipeBoard = () => {
    setContentsTop(0);
    const modifiedSwipeData = modifyDataToSwipe(swipeData);

    if (!swipeData.waitingData.length) {
      return dispatch(PostBoardAction.setFetch());
    }
    dispatch(PostBoardAction.setFocusedDataIndex(modifiedSwipeData.currentData[0].dateIndex));
    dispatch(PostBoardAction.setData(modifiedSwipeData));
  };

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
    <Container>
      <div
        className='swipe-container'
        onClick={onClickChangeToScrollMode}
      >
        <SwipeContents
          ref={contentsRef}
          contentsTop={contentsTop}
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
      </div>
    </Container>
  );
};

export default SwipeBoard;
