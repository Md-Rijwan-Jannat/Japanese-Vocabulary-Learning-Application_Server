import { Router } from 'express';
import { AuthRoutes } from '../module/Auth/auth.routes';
import { UserRoutes } from '../module/User/user.routes';
import { LessonRoutes } from '../module/Lessons/lessons.routes';
import { VocabularyRoutes } from '../module/Vocabulary/vocabulary.routes';
import { TutorialRoutes } from '../module/Tutorial/tutorial.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/lessons',
    route: LessonRoutes,
  },
  {
    path: '/vocabularies',
    route: VocabularyRoutes,
  },
  {
    path: '/tutorials',
    route: TutorialRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
