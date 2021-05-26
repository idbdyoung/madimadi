import { UserType } from "./user";

export type CommentType = {
  commentId: number;
  authorId: UserType.userId;
  created: string;
  contents: string;
};
