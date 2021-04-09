import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { getMadi } from '../lib/api/madi';
import { useWindowDimensions } from '../lib/utils';

import PostBoard from '../components/PostBoard';
import TimeBox from '../components/TimeBox';
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

interface dimensionType {
  width?: number | null;
  height?: number | null;
};

const Container = styled.div<dimensionType>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${(props) => `${props.height}px`};
  .madimadi-contents {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 100%;
    .madimadi-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 90px;
      font-family: Noto Sans;
      font-size: 25px;
      font-style: normal;
      font-weight: 600;
    }
    .madimadi-time {
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }
    .madimadi-board {
      flex: 1;
      width: 100%;
      padding-bottom: 33px;
    }
  }
`;

const index: NextPage<IProps> = ({ madimadi }) => {
  const ref = useRef(null);
  const windowHeight = useWindowDimensions().height;
  const [pageHeight, setPageHeight] = useState<number>(0);

  useEffect(() => {
    if (windowHeight !== null) setPageHeight(windowHeight - 60);
  }, [windowHeight]);

  return (
    <Container
      height={pageHeight}
      ref={ref}
    >
      <div className='madimadi-contents'>
        <div className='madimadi-title'>
          오늘의 한마디
        </div>
        <div className='madimadi-time'>
          <TimeBox />
        </div>
        <div className='madimadi-board'>
          <PostBoard madimadi={madimadi} parentNode={ref}/>
        </div>
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
