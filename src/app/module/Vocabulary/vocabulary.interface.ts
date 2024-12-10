import { Types } from 'mongoose';

export interface TVocabulary {
  word: string;
  pronunciation?: string;
  meaning?: string;
  whenToSay: string;
  lesson: Types.ObjectId;
  createdBy: Types.ObjectId;
}
