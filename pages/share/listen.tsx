import { NextPage } from 'next';

import styled from 'styled-components';

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
    .title-container {
      width: 100%;
      height: 120px;
      margin-bottom: 2px;
      box-shadow: 0 5px 5px -5px rgba(0,0,0,0.25);
      background: yellow;
    }
    .loading-container {
      width: 100%;
      height: 50px;
    }
  }
`;

const listen: NextPage = () => {
  return (
    <Container>
      <div className='side-box-wrapper'>
      </div>
      <div className='center-box-wrapper'>
        <div className='title-container'>

        </div>
      </div>
      <div className='side-box-wrapper'>
      </div>
    </Container>
  );
};

export default listen;
