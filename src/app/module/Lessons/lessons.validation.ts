import { Types } from 'mongoose';
import { z } from 'zod';

const createLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    number: z.number().min(1, 'Number should be greater than 0'),
  }),
});

const updateLessonValidationSchema = z
  .object({
    body: z.object({
      name: z.string().min(1, 'Name is required').optional(),
      number: z.number().min(1, 'Number should be greater than 0').optional(),
    }),
  })
  .partial();

export const LessonValidation = {
  createLessonValidationSchema,
  updateLessonValidationSchema,
};
