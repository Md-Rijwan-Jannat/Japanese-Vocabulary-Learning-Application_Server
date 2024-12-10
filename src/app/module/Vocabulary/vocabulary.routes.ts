import express from 'express';
import { VocabularyController } from './vocabulary.controller';
import validateRequest from '../../middlewares/validateRequest';
import { VocabularyValidation } from './vocabulary.validation';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get(
  '/',
  Auth(USER_ROLE.admin, USER_ROLE.user),
  VocabularyController.getAllVocabularies
);

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(VocabularyValidation.createVocabularySchema),
  VocabularyController.createVocabulary
);

router.patch(
  '/:id',
  Auth(USER_ROLE.admin),
  validateRequest(VocabularyValidation.updateVocabularySchema),
  VocabularyController.updateVocabulary
);

router.delete(
  '/:id',
  Auth(USER_ROLE.admin),
  VocabularyController.deleteVocabulary
);

export const VocabularyRoutes = router;
