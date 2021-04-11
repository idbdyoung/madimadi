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
  width: 99%;
  height: 224px;
  border: 1px solid #C2CFE0;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PostBox: React.FC<IProps> = ({ madi }) => {
  return (
    <Container>

    </Container>
  );
};

export default PostBox;
