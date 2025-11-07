import { Router } from 'express';
import okrRoutes from './okr.routes';
import userRoutes from './user.routes';
import cfrRoutes from './cfr.routes';
import kpiRoutes from './kpi.routes';

const router = Router();

// API Routes
router.use('/okrs', okrRoutes);
router.use('/users', userRoutes);
router.use('/cfr', cfrRoutes);
router.use('/kpis', kpiRoutes);

// API Info
router.get('/', (req, res) => {
  res.json({
    name: 'Alpha OKR Dashboard API',
    version: '1.0.0',
    description: 'API para gestão de OKRs, CFR e PDI',
    endpoints: {
      okrs: '/api/v1/okrs',
      users: '/api/v1/users',
      cfr: '/api/v1/cfr',
      kpis: '/api/v1/kpis',
    },
  });
});

export default router;
