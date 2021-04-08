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
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
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
    letter-spacing: 0.20000000298023224px;
  }
  .madimadi-time {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

const index: React.FC<IProps> = ({ madimadi }) => {
  return (
    <Container>
      <div className='madimadi-title'>
        오늘의 한마디
      </div>
      <div className='madimadi-time'>
        <TimeBox />
      </div>
      <PostBox />
      <PostBox />
      <PostBox />
    </Container>
  );
};

export default index;
