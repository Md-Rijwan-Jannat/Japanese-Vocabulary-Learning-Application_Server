// auth.validation.ts
import { z } from 'zod';

export const AuthValidation = {
  registerValidationSchema: z.object({
    body: z.object({
      name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(50, { message: 'Name cannot exceed 50 characters' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: 'Password cannot exceed 20 characters' }),
      photo: z
        .string()
        .url({ message: 'Photo must be a valid URL' })
        .optional(),
    }),
  }),

  loginValidationSchema: z.object({
    body: z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
  }),
};
