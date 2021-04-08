import styled from 'styled-components';
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
`;

const index: React.FC<IProps> = ({ madimadi }) => {
  return (
    <Container>
      <PostBox />
      <PostBox />
      <PostBox />
    </Container>
  );
};

export default index;
