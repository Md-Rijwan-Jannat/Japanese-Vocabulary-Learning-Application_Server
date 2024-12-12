import { z } from 'zod';

const createTutorialValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    videoLink: z.string().min(1, 'Video link is required'),
    description: z.string().min(1, 'Description is required'),
    published: z.boolean().optional(),
  }),
});

const updateTutorialValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    videoLink: z.string().optional(),
    description: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const TutorialValidation = {
  createTutorialValidationSchema,
  updateTutorialValidationSchema,
};
