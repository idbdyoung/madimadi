import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useSelector } from '../store';
import { PostBoardAction } from '../store/postBoard';

import SwipeBoard from '../components/PostBoard/SwipeBoard';
import ScrollBoard from '../components/PostBoard/ScrollBoard';

interface ContainerType {
  height: number | undefined;
}

const Container = styled.div.attrs<ContainerType>((props) => ({
  style: {
    height: `${props.height}px`,
  },
}))<ContainerType>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const postBoardContainer: React.FC = () => {
  const dispatch = useDispatch();
  const postBoard = useSelector(state => state.postBoard);
  const pageHeight = postBoard.postItemHeight * 3 + 120;
  const fetch = postBoard.fetch;
  const isFirstRun = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    dispatch(PostBoardAction.fetchBoardData(postBoard));
  }, [fetch]);

  return (
    <Container height={pageHeight}>
      {
        postBoard.isSwipeMode ?
        <SwipeBoard /> :
        <ScrollBoard />
      }
    </Container>
  );
};

export default postBoardContainer;
