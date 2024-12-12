import { model, Schema, Types } from 'mongoose';
import { TTutorial } from './tutorial.interface';

const tutorialSchema: Schema<TTutorial> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Tutorial = model<TTutorial>('Tutorial', tutorialSchema);
