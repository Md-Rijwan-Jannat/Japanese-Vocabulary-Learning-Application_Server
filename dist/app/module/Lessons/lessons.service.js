"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const lessons_model_1 = require("./lessons.model");
const mongoose_1 = require("mongoose");
const vocabulary_model_1 = require("../Vocabulary/vocabulary.model");
const auth_model_1 = require("../Auth/auth.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const getAllLessons = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonQueryBuilder = new queryBuilder_1.default(lessons_model_1.Lesson.find()
        .populate({
        path: 'createdBy',
    })
        .populate({
        path: 'vocabularies',
    }), query)
        .search(['name'])
        .sort()
        .fields()
        .filter()
        .paginate();
    const result = yield lessonQueryBuilder.modelQuery;
    const meta = yield lessonQueryBuilder.countTotal();
    return { result, meta };
});
const createLesson = (lessonData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, number, createdBy, vocabularies } = lessonData;
    // Validate if the createdBy user exists
    const userExists = yield auth_model_1.User.findById(createdBy);
    if (!userExists) {
        throw new Error('The specified user does not exist.');
    }
    // Validate if vocabularies exist (only if vocabularies are provided)
    if ((vocabularies === null || vocabularies === void 0 ? void 0 : vocabularies.length) > 0) {
        const vocabularyIds = vocabularies.map((id) => new mongoose_1.Types.ObjectId(id));
        const existingVocabularies = yield vocabulary_model_1.Vocabulary.find({
            _id: { $in: vocabularyIds },
        });
        if ((existingVocabularies === null || existingVocabularies === void 0 ? void 0 : existingVocabularies.length) !== (vocabularies === null || vocabularies === void 0 ? void 0 : vocabularies.length)) {
            throw new Error('One or more vocabularies do not exist.');
        }
    }
    // Create the lesson if validations pass
    return lessons_model_1.Lesson.create({
        name,
        number,
        createdBy,
        vocabularies, // Can be empty array
    });
});
const updateLesson = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lessons_model_1.Lesson.findByIdAndUpdate(id, updates, { new: true });
    if (!lesson)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lesson not found');
    return lesson;
});
const deleteLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lessons_model_1.Lesson.findByIdAndDelete(id);
    if (!lesson)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lesson not found');
    return lesson;
});
exports.LessonService = {
    getAllLessons,
    createLesson,
    updateLesson,
    deleteLesson,
};
