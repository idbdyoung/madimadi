import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { getMadi } from '../lib/api/madi';
import { useWindowDimensions } from '../lib/utils';

import PostBoard from '../components/PostBoard';
import { useEffect, useState } from 'react';

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
  overflow-y: hidden;
  .madimadi-contents {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 100%;
  }
`;

const index: NextPage<IProps> = ({ madimadi }) => {
  const windowHeight = useWindowDimensions().height;
  const [pageHeight, setPageHeight] = useState<number>(0);

  useEffect(() => {
    if (windowHeight !== null) setPageHeight(windowHeight - 60);
  }, [windowHeight]);

  return (
    <Container height={pageHeight}>
      <div className='madimadi-contents'>
        <PostBoard madimadi={madimadi} pageHeight={pageHeight}/>
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
