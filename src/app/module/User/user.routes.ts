import { Router } from 'express';
import { AuthController } from './user.controller';

const router = Router();

router.get('/', AuthController.getAllUsers);
router.get('/:id', AuthController.getUserById);
router.put('/:id', AuthController.updateUser);
router.delete('/:id', AuthController.deleteUser);
router.patch('/:id/role', AuthController.updateRole);

export const UserRoutes = router;
