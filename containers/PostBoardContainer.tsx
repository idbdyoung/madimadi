import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useSelector } from '../store';
import { PostBoardAction } from '../store/postBoard';

import SwipeBoard from '../components/PostBoard/SwipeBoard';
import ScrollBoard from '../components/PostBoard/ScrollBoard';
import Loading from '../components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const index: React.FC = () => {
  const dispatch = useDispatch();
  const postBoard = useSelector(state => state.postBoard);
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
    <Container>
      {
        postBoard.isSwipeMode ?
        <SwipeBoard /> :
        <ScrollBoard />
      }
      <Loading />
    </Container>
  );
};

export default index;
