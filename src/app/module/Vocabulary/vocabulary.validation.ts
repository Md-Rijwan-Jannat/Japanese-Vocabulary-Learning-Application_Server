import { z } from 'zod';

const createVocabularySchema = z.object({
  body: z.object({
    word: z.string().nonempty({ message: 'Word is required' }),
    pronunciation: z.string().optional(),
    meaning: z.string().optional(),
    whenToSay: z.string().nonempty({ message: 'When to say is required' }),
  }),
});

const updateVocabularySchema = z.object({
  body: z.object({
    word: z.string().optional(),
    pronunciation: z.string().optional(),
    meaning: z.string().optional(),
    whenToSay: z.string().optional(),
  }),
});

export const VocabularyValidation = {
  createVocabularySchema,
  updateVocabularySchema,
};
