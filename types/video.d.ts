import { UserType } from './user';

export type VideoType = {
  id: number;
  author: UserType;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
  videoThumbnail: string;
  videoAuthor: string;
  videoHtmlInsert: string;
  createdAt: string;
  updatedAt: string;
};

export type VideoPostBodyType = {
  authorId: number;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
  videoThumbnail: string;
  videoAuthor: string;
  videoHtmlInsert: string;
};
