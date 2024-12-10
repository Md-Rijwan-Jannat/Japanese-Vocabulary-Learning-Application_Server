import mongoose, { Schema, model } from 'mongoose';
import { TVocabulary } from './vocabulary.interface';

const VocabularySchema = new Schema<TVocabulary>(
  {
    word: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
    },
    meaning: {
      type: String,
    },
    whenToSay: {
      type: String,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Vocabulary = model('Vocabulary', VocabularySchema);
