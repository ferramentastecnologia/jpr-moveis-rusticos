import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

// User específicos
router.get('/:id/dashboard', userController.getDashboard);
router.get('/:id/team', userController.getTeam);

export default router;
