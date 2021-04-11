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
  madi: madiType;
}

const Container = styled.div`
  margin: 10px auto;
  width: 99%;
  height: 224px;
  border: 1px solid #C2CFE0;
  cursor: pointer;
`;

const PostBox: React.FC<IProps> = ({ madi }) => {
  return (
    <Container>

    </Container>
  );
};

export default PostBox;
