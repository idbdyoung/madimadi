import { format } from 'date-fns'

const TimeBox: React.FC = () => {
  const dateSet = format(new Date(), 'yyyy-MM-dd eee');

  return (
    <div>
      { dateSet }
    </div>
  );
};

export default TimeBox;
