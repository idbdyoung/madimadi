import { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  background: yellow;
`;

const index: NextPage = () => {
  return (
    <Container>
      <div>MadiMadi</div>
    </Container>
  )
};

export default index;
