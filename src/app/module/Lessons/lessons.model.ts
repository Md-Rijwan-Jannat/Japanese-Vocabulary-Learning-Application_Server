import mongoose, { Schema, Model } from 'mongoose';
import { TLesson } from './lessons.interface';

const LessonSchema: Schema<TLesson> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    vocabularies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vocabulary',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const Lesson: Model<TLesson> = mongoose.model<TLesson>(
  'Lesson',
  LessonSchema
);
