import { format } from 'date-fns'

import styled from 'styled-components';

const Container = styled.div`
  width: 101px;
  color: #6A707E;
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
`;

const TimeBox: React.FC = () => {
  const dateSet = format(new Date(), 'yyyy-MM-dd eee');

  return (
    <Container>
      { dateSet }
    </Container>
  );
};

export default TimeBox;
