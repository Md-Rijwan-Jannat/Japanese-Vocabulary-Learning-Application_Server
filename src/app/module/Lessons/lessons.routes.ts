import express from 'express';
import { LessonController } from './lessons.controller';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { LessonValidation } from './lessons.validation';

const router = express.Router();

router.get('/', LessonController.getAllLessons); // Public
router.get('/:id', LessonController.getLessonsById); // Public

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(LessonValidation.createLessonValidationSchema),
  LessonController.createLesson
); // Admin only

router.put(
  '/:lessonId/complete',
  Auth(USER_ROLE.admin, USER_ROLE.user),
  LessonController.completeLesson
);

router.patch(
  '/:id',
  Auth(USER_ROLE.admin),
  validateRequest(LessonValidation.updateLessonValidationSchema),
  LessonController.updateLesson
); // Admin only

router.delete('/:id', Auth(USER_ROLE.admin), LessonController.deleteLesson); // Admin only

export const LessonRoutes = router;
