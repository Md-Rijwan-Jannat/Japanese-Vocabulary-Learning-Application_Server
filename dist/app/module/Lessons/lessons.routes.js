"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRoutes = void 0;
const express_1 = __importDefault(require("express"));
const lessons_controller_1 = require("./lessons.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const lessons_validation_1 = require("./lessons.validation");
const router = express_1.default.Router();
router.get('/', lessons_controller_1.LessonController.getAllLessons); // Public
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(lessons_validation_1.LessonValidation.createLessonValidationSchema), lessons_controller_1.LessonController.createLesson); // Admin only
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(lessons_validation_1.LessonValidation.updateLessonValidationSchema), lessons_controller_1.LessonController.updateLesson); // Admin only
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), lessons_controller_1.LessonController.deleteLesson); // Admin only
exports.LessonRoutes = router;
