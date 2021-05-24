import data from '../../data/index.mockup.json';
import { MadiType } from '../../types/madi';

interface resultType {
  responseData: MadiType[],
  nextRequestIndex: number,
}

const getMadi = (index: number) => {
  const result: resultType = {
    responseData: [],
    nextRequestIndex: index,
  };

  try {
  } catch (e) {
  }

  for (let i = index; i < index + 10; i ++) {
    if (data[i]) {
      result.responseData.push(data[i]);
      result.nextRequestIndex = i;
    }
  }

  if (result.responseData.length) {
    result.nextRequestIndex += 1;
  }

  return result;
};

export default {
  getMadi,
};
