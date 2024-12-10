import mongoose, { Schema, Document, Model } from 'mongoose';
import { TLesson } from './lessons.interface';

const LessonSchema: Schema<TLesson> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Lesson: Model<TLesson> = mongoose.model<TLesson>(
  'Lesson',
  LessonSchema
);
