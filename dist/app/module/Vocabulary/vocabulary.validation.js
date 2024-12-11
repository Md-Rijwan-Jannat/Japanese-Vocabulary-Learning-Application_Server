"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyValidation = void 0;
const zod_1 = require("zod");
const createVocabularySchema = zod_1.z.object({
    body: zod_1.z.object({
        word: zod_1.z.string().nonempty({ message: 'Word is required' }),
        pronunciation: zod_1.z.string().optional(),
        meaning: zod_1.z.string().optional(),
        whenToSay: zod_1.z.string().nonempty({ message: 'When to say is required' }),
    }),
});
const updateVocabularySchema = zod_1.z.object({
    body: zod_1.z.object({
        word: zod_1.z.string().optional(),
        pronunciation: zod_1.z.string().optional(),
        meaning: zod_1.z.string().optional(),
        whenToSay: zod_1.z.string().optional(),
    }),
});
exports.VocabularyValidation = {
    createVocabularySchema,
    updateVocabularySchema,
};
