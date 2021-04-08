import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { getMadi } from '../lib/api/madi';

import PostBoard from '../components/PostBoard';

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  .madimadi-contents-board {
    width: 800px;
    height: 900px;
  }
`;

const index: NextPage<IProps> = ({ madimadi }) => {
  return (
    <Container>
      <div className='madimadi-contents-board'>
        <PostBoard madimadi={madimadi}/>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getMadi();

    return { props: { madiArr: data } };
  } catch (e) {
    console.log(e);

    return { props: { madiArr: [] } };
  }
};

export default index;
