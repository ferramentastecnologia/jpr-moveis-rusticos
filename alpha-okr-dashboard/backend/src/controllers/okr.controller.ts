import { Request, Response } from 'express';
import { OKRService } from '../services/okr.service';
import { AppError } from '../middleware/errorHandler';

export class OKRController {
  private okrService: OKRService;

  constructor() {
    this.okrService = new OKRService();
  }

  create = async (req: Request, res: Response) => {
    const okr = await this.okrService.create(req.body);
    res.status(201).json({
      status: 'success',
      data: okr,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const okrs = await this.okrService.findAll();
    res.json({
      status: 'success',
      data: okrs,
    });
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const okr = await this.okrService.findOne(id);

    if (!okr) {
      throw new AppError('OKR not found', 404);
    }

    res.json({
      status: 'success',
      data: okr,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const okr = await this.okrService.update(id, req.body);

    res.json({
      status: 'success',
      data: okr,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.okrService.delete(id);

    res.status(204).send();
  };

  findByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const okrs = await this.okrService.findByUser(userId);

    res.json({
      status: 'success',
      data: okrs,
    });
  };

  findByCiclo = async (req: Request, res: Response) => {
    const { ciclo } = req.params;
    const okrs = await this.okrService.findByCiclo(ciclo);

    res.json({
      status: 'success',
      data: okrs,
    });
  };

  getHierarchy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const hierarchy = await this.okrService.getHierarchy(id);

    res.json({
      status: 'success',
      data: hierarchy,
    });
  };

  updateProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const okr = await this.okrService.updateProgress(id);

    res.json({
      status: 'success',
      data: okr,
    });
  };
}
