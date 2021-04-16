import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { getMadi } from '../lib/api/madi';
import { useWindowDimensions } from '../lib/utils';

import PostBoard from '../components/PostBoard';
import { useEffect, useRef, useState } from 'react';

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
}

interface containerType {
  width?: number | null;
  height?: number | null;
  isScrollBoardOpen: boolean;
};

const Container = styled.div<containerType>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${(props) => `${props.height}px`};
  overflow-y: hidden;
  background: ${(props) => props.isScrollBoardOpen ? 'rgba(194, 207, 224, 0.1)' : ''};
  .madimadi-contents {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 100%;
  }
`;

const index: NextPage<IProps> = ({ madimadi }) => {
  const ref = useRef(null);
  const windowHeight = useWindowDimensions().height;
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [isScrollBoardOpen, setScrollBoardOpen] = useState(false);

  const onClick = () => setScrollBoardOpen(false);

  useEffect(() => {
    if (windowHeight !== null) setPageHeight(windowHeight - 60);
  }, [windowHeight]);

  return (
    <Container
      ref={ref}
      height={pageHeight}
      onClick={onClick}
      isScrollBoardOpen={isScrollBoardOpen}
    >
      <div className='madimadi-contents'>
        <PostBoard
          madimadi={madimadi}
          pageHeight={pageHeight}
          isScrollBoardOpen={isScrollBoardOpen}
          setScrollBoardOpen={setScrollBoardOpen}
        />
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getMadi();

    return { props: { madimadi: data } };
  } catch (e) {
    console.log(e);

    return { props: { madimadi: [] } };
  }
};

export default index;
