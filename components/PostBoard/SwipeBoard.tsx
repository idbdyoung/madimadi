import styled from 'styled-components';

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
  background: yellow;
`;

const SwipeBoard: React.FC<IProps> = ({ madimadi }) => {
  return (
    <Container>
    </Container>
  );
};

export default SwipeBoard;
