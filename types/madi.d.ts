import { UserType } from './user';

export type MadiType = {
  dateNumber: number;
  index: number;
  authorObj: UserType;
  created: string;
  contents: string;
  source: string;
  like: UserType[];
  commentIndex: number[];
};
