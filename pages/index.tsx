import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { useSelector, wrapper } from '../store';
import { PostBoardAction } from '../store/postBoard';
import { getMadi } from '../lib/api/madi';

import PostBoardContainer from '../containers/PostBoardContainer';
import WritingBox from '../components/PostBoard/WritingBox';
import Loading from '../components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  .side-box-wrapper {
    flex: 1;
    height: 100%;
  }
  .center-box-wrapper {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 100%;
    .loading-container {
      width: 100%;
      height: 50px;
    }
  }
`;

const index: NextPage = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.loading.getMadiMadiFetching);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      dispatch(PostBoardAction.setPostItemHeight((containerRef.current.offsetHeight - 170) / 3));
    }
  }, [containerRef]);

  return (
    <Container ref={containerRef}>
      <div className='side-box-wrapper'>
      </div>
      <div className='center-box-wrapper'>
        <PostBoardContainer />
        <div className='loading-container'>
          {
            isFetching && <Loading />
          }
        </div>
      </div>
      <div className='side-box-wrapper'>
        <WritingBox />
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      const { data } = await getMadi(0);
      const { nextRequestIndex, responseData } = data;
      store.dispatch(PostBoardAction.fetchDataSuccess(nextRequestIndex, responseData));
      const splicedData = responseData.splice(0, 4);
      const firstSwipeData = {
        currentData: splicedData,
        waitingData: responseData,
        recycledData: [],
      };
      store.dispatch(PostBoardAction.setData(firstSwipeData));

      return { props: {} };
    } catch (error) {
      console.log(error);

      return { props: {} };
    }
  }
);

export default index;
