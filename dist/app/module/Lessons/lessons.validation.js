"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonValidation = void 0;
const zod_1 = require("zod");
const createLessonValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        number: zod_1.z.number().min(1, 'Number should be greater than 0'),
    }),
});
const updateLessonValidationSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        number: zod_1.z.number().min(1, 'Number should be greater than 0').optional(),
    }),
})
    .partial();
exports.LessonValidation = {
    createLessonValidationSchema,
    updateLessonValidationSchema,
};
