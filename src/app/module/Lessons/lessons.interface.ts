import { Types } from 'mongoose';

export interface TLesson extends Document {
  name: string;
  number: number;
  createdBy: Types.ObjectId;
  vocabularies: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
