import { Types } from 'mongoose';

export interface TTutorial {
  title: string;
  createdBy: Types.ObjectId;
  videoLink: string;
  description: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
