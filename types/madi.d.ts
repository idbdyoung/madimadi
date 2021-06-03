import { CommentType } from './comment';
import { UserType } from './user';

export type MadiType = {
  id: number;
  dateCode: string;
  dateIndex: number;
  author: UserType;
  description: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
  likes: UserType.userId[];
  comments: CommentType.commentId[];
};

export type PostMadiType = {
  description: string;
  source: string;
};

export type MadiBodyType = PostMadiType & {
  authorId: number;
};
