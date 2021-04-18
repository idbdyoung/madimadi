import data from '../../data/index.mockup.json';

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
interface resultType {
  isLastData: boolean,
  responseData: madiType[],
}

const getMadi = (index: number) => {
  const startNumber = index * 10;
  const result: resultType = {
    responseData: [],
    isLastData: false,
  };

  try {
  } catch (e) {
  }

  for (let i = startNumber; i < startNumber + 10; i ++) {
    if (data[i]) result.responseData.push(data[i]);
  }

  if (!data[startNumber + 10]) result.isLastData = true;

  //1. 다음에 요청이 들어오면 반환할 수 있다. (잔여 0 < data)
  //2. 다음에 요청이 들어오면 반환할 수 없다. (잔여 0 >= data) => isLastData

  return result;
};

export default {
  getMadi,
};
