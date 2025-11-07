import { Request, Response } from 'express';
import { KPIService } from '../services/kpi.service';

export class KPIController {
  private kpiService: KPIService;

  constructor() {
    this.kpiService = new KPIService();
  }

  create = async (req: Request, res: Response) => {
    const kpi = await this.kpiService.create(req.body);
    res.status(201).json({
      status: 'success',
      data: kpi,
    });
  };

  findByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const kpis = await this.kpiService.findByUser(userId);

    res.json({
      status: 'success',
      data: kpis,
    });
  };

  syncKPIs = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await this.kpiService.syncKPIs(userId);

    res.json({
      status: 'success',
      data: result,
    });
  };
}
