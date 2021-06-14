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
  likes: MadiLikeType[];
};

export type MadiLikeType = {
  id: number;
  madiId: number;
  userId: number;
};

export type MadiPostBodyType = {
  authorId: number;
  description: string;
  source: string;
};

export type MadiLikePostBodyType = {
  userId: UserType.id;
  madiId: number.id;
};
