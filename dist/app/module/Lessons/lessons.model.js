"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LessonSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    vocabularies: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Vocabulary',
            default: [],
        },
    ],
}, { timestamps: true });
exports.Lesson = mongoose_1.default.model('Lesson', LessonSchema);
