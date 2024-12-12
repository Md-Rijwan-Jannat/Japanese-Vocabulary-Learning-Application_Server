import express from 'express';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { TutorialController } from './tutorial.controller';
import { TutorialValidation } from './tutorial.validation';

const router = express.Router();

router.get(
  '/',
  Auth(USER_ROLE.admin, USER_ROLE.user),
  TutorialController.getAllTutorials
); // Public

router.get(
  '/:id',
  Auth(USER_ROLE.admin, USER_ROLE.user),
  TutorialController.getTutorialById
); // Public

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(TutorialValidation.createTutorialValidationSchema),
  TutorialController.createTutorial
); // Admin only

router.patch(
  '/:id',
  Auth(USER_ROLE.admin),
  validateRequest(TutorialValidation.updateTutorialValidationSchema),
  TutorialController.updateTutorial
); // Admin only

router.delete('/:id', Auth(USER_ROLE.admin), TutorialController.deleteTutorial); // Admin only

export const TutorialRoutes = router;
