import styled from 'styled-components';

import TimeBox from '../TimeBox';
import PostBox from './PostBox';

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
  width: 100%;
  height: 100%;
  .madimadi-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 23px;
    font-family: Noto Sans;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
  }
  .madimadi-time {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 30px;
  }
`;

const SwipeBoard: React.FC<IProps> = ({ madimadi }) => {
  return (
    <Container>
      <div className='madimadi-title'>
        오늘의 한마디
      </div>
      <div className='madimadi-time'>
        <TimeBox />
      </div>
      <PostBox
        key={madimadi[0].index}
        madi={madimadi[0]}
      />
      <PostBox
        key={madimadi[1].index}
        madi={madimadi[0]}
      />
      <PostBox
        key={madimadi[2].index}
        madi={madimadi[0]}
      />
    </Container>
  );
};

export default SwipeBoard;
