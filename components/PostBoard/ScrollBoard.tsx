import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { handleBoardDataWhenChangeMode } from '../../lib/utils/postBoard';
import { useSelector } from '../../store';
import { PostBoardAction } from '../../store/postBoard';

import PostItem from './PostItem';

const ScrollBoardDim = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.03);
`;
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ScrollBoard: React.FC = () => {
  const dispatch = useDispatch();
  const postBoard = useSelector(state => state.postBoard);
  const scrollData = postBoard.scrollData;
  const containerRef = useRef<HTMLDivElement>(null);
  const postItemRefs = useRef<any[]>([]);

  const onClickChangeToSwipeMode = async () => {
    const handledBoardData = handleBoardDataWhenChangeMode(postBoard);
    dispatch(PostBoardAction.setData(handledBoardData));
    dispatch(PostBoardAction.changeBoardMode());
  };
  const onIntersectPostItem: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      if (entry.target === postItemRefs.current[postItemRefs.current.length - 1]) {
        dispatch(PostBoardAction.setFetch());
      }
    }
  };

  useEffect(() => {
    postItemRefs.current = postItemRefs.current.slice(0, scrollData.length);

    if (containerRef.current !== null) {
      containerRef.current.scroll(0, postBoard.postItemHeight * postBoard.focusedIndex);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersectPostItem, { threshold: 0.3 });

    for (let i = 0; i < postItemRefs.current.length; i++) {
      observer.observe(postItemRefs.current[i]);
    }

    return () => observer.disconnect();
  }, [scrollData]);

  return (
    <>
      <ScrollBoardDim onClick={onClickChangeToSwipeMode}/>
      <Container ref={containerRef}>
        {
          scrollData.map((data, i) => {
            return (
              <div
                key={i}
                ref={(el) => postItemRefs.current[i] = el}
              >
                <PostItem
                  key={i}
                  data={data}
                  height={postBoard.postItemHeight}
                />
              </div>
            );
          })
        }
      </Container>
    </>
  );
};

export default ScrollBoard;
