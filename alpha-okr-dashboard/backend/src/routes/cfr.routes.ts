import { Router } from 'express';
import { CFRController } from '../controllers/cfr.controller';

const router = Router();
const cfrController = new CFRController();

// Conversas (1:1s)
router.post('/conversas', cfrController.createConversa);
router.get('/conversas/user/:userId', cfrController.getConversasByUser);

// Feedbacks
router.post('/feedbacks', cfrController.createFeedback);
router.get('/feedbacks/user/:userId', cfrController.getFeedbacksByUser);

// Reconhecimentos
router.post('/reconhecimentos', cfrController.createReconhecimento);
router.get('/reconhecimentos/user/:userId', cfrController.getReconhecimentosByUser);

export default router;
