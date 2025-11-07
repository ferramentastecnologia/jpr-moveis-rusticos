import { Router } from 'express';
import { KPIController } from '../controllers/kpi.controller';

const router = Router();
const kpiController = new KPIController();

router.post('/', kpiController.create);
router.get('/user/:userId', kpiController.findByUser);
router.post('/sync/:userId', kpiController.syncKPIs);

export default router;
