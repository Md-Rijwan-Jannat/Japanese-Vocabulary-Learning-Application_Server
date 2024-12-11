"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vocabulary_controller_1 = require("./vocabulary.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const vocabulary_validation_1 = require("./vocabulary.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), vocabulary_controller_1.VocabularyController.getAllVocabularies);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(vocabulary_validation_1.VocabularyValidation.createVocabularySchema), vocabulary_controller_1.VocabularyController.createVocabulary);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(vocabulary_validation_1.VocabularyValidation.updateVocabularySchema), vocabulary_controller_1.VocabularyController.updateVocabulary);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), vocabulary_controller_1.VocabularyController.deleteVocabulary);
exports.VocabularyRoutes = router;
