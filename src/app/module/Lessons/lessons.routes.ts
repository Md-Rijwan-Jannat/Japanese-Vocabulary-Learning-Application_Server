import express from 'express';
import { LessonController } from './lessons.controller';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/', LessonController.getAllLessons); // Public
router.post('/', Auth(USER_ROLE.admin), LessonController.createLesson); // Admin only
router.patch('/:id', Auth(USER_ROLE.admin), LessonController.updateLesson); // Admin only
router.delete('/:id', Auth(USER_ROLE.admin), LessonController.deleteLesson); // Admin only

export const LessonRoutes = router;
