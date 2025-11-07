import { Router } from 'express';
import { OKRController } from '../controllers/okr.controller';

const router = Router();
const okrController = new OKRController();

// OKR CRUD
router.post('/', okrController.create);
router.get('/', okrController.findAll);
router.get('/:id', okrController.findOne);
router.put('/:id', okrController.update);
router.delete('/:id', okrController.delete);

// OKR específicos
router.get('/user/:userId', okrController.findByUser);
router.get('/ciclo/:ciclo', okrController.findByCiclo);
router.get('/:id/hierarchy', okrController.getHierarchy);
router.post('/:id/update-progress', okrController.updateProgress);

export default router;
