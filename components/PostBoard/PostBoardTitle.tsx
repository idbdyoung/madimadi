import styled from 'styled-components';

import TimeBox from '../TimeBox';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: white;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    font-family: Noto Sans;
    font-size: 25px;
    font-weight: 600;
    color: #373F41;
  }
  .date-set {
    display: flex;
    justify-content: flex-end;
    height: 20px;
    font-family: Noto Sans;
    font-size: 12px;
    padding-right: 25px;
    color: #6A707E;
  }
`;

const PostBoardTitle: React.FC = () => {
  return (
    <Container>
      <h1 className='title'>
        오늘의 한마디
      </h1>
      <div className='date-set'>
        <TimeBox />
      </div>
    </Container>
  );
};

export default PostBoardTitle;
