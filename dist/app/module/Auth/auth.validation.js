"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
// auth.validation.ts
const zod_1 = require("zod");
exports.AuthValidation = {
    registerValidationSchema: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z
                .string()
                .min(1, { message: 'Name is required' })
                .max(50, { message: 'Name cannot exceed 50 characters' }),
            email: zod_1.z.string().email({ message: 'Invalid email address' }),
            password: zod_1.z
                .string()
                .min(6, { message: 'Password must be at least 6 characters long' })
                .max(20, { message: 'Password cannot exceed 20 characters' }),
            photo: zod_1.z
                .string()
                .url({ message: 'Photo must be a valid URL' })
                .optional(),
        }),
    }),
    loginValidationSchema: zod_1.z.object({
        body: zod_1.z.object({
            email: zod_1.z.string().email({ message: 'Invalid email address' }),
            password: zod_1.z
                .string()
                .min(6, { message: 'Password must be at least 6 characters long' }),
        }),
    }),
};
