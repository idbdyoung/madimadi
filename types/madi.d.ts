import { UserType } from './user';

export type MadiType = {
  dateNumber: number;
  index: number;
  authorId: UserType.userId;
  created: string;
  contents: string;
  source: string;
  like: UserType.userId[];
  commentId: number[];
};
export type PostMadiType = {
  dateNumber: number;
  authorId: UserType.userId;
  contents: string;
  source: string;
};
