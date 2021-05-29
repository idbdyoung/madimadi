import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { useWindowDimensions } from '../lib/utils';
import { wrapper } from '../store';
import { PostBoardAction } from '../store/postBoard';
import { getMadi } from '../lib/api/madi';

import PostBoardContainer from '../containers/PostBoardContainer';
import WritingBox from '../components/PostBoard/WritingBox';

interface ContainerType {
  pageHeight: number;
}

const Container = styled.div.attrs<ContainerType>((props) => ({
  style: {
    height: `${props.pageHeight}px`,
  }
}))<ContainerType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const PostBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;
`;
const AlarmBoxWrapper = styled.div`
  flex: 1;
  height: 100%;
  background: blue;
`;
const WritingBoxWrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const index: NextPage = () => {
  const [pageHeight, setPageHeight] = useState(0);
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    if (windowHeight !== null) setPageHeight(windowHeight - 60);

    return () => setPageHeight(0);
  }, [windowHeight]);

  return (
    <Container pageHeight={pageHeight}>
      <AlarmBoxWrapper>
      </AlarmBoxWrapper>
      <PostBoardWrapper>
        <PostBoardContainer />
      </PostBoardWrapper>
      <WritingBoxWrapper>
        <WritingBox />
      </WritingBoxWrapper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      const { data } = await getMadi(0);
      const { responseData, nextRequestIndex } = data;
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
