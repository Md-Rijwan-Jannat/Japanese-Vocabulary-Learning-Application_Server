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
exports.VocabularyService = void 0;
const vocabulary_model_1 = require("./vocabulary.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("../Auth/auth.model");
const lessons_model_1 = require("../Lessons/lessons.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const getAllVocabularies = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabularyQueryBuilder = new queryBuilder_1.default(vocabulary_model_1.Vocabulary.find().populate('createdBy').populate('lesson'), query)
        .search(['word', 'meaning'])
        .sort()
        .fields()
        .filter()
        .paginate();
    const result = yield vocabularyQueryBuilder.modelQuery;
    const meta = yield vocabularyQueryBuilder.countTotal();
    return { result, meta };
});
const createVocabulary = (data, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the admin exists
    const admin = yield auth_model_1.User.findById(adminId);
    if (!admin)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    return vocabulary_model_1.Vocabulary.create(Object.assign(Object.assign({}, data), { createdBy: admin._id }));
});
const updateVocabulary = (id, data, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the admin exists
    const admin = yield auth_model_1.User.findById(adminId);
    if (!admin)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    const updated = yield vocabulary_model_1.Vocabulary.findByIdAndUpdate(id, data, { new: true });
    if (!updated)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Vocabulary not found');
    return updated;
});
const deleteVocabulary = (id, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the admin exists
    const admin = yield auth_model_1.User.findById(adminId);
    if (!admin)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    // Find and delete the vocabulary
    const deleted = yield vocabulary_model_1.Vocabulary.findByIdAndDelete(id);
    if (!deleted)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Vocabulary not found');
    // Remove the deleted vocabulary's ID from all lessons' vocabularies arrays
    yield lessons_model_1.Lesson.updateMany({ vocabularies: id }, { $pull: { vocabularies: id } });
    return deleted;
});
exports.VocabularyService = {
    getAllVocabularies,
    createVocabulary,
    updateVocabulary,
    deleteVocabulary,
};
