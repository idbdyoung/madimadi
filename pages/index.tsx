import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  background: yellow;
`;

const index: NextPage = () => {
  return (
    <Container>
    </Container>
  )
};

export default index;
