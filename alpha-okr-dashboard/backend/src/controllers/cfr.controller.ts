import { Request, Response } from 'express';
import { CFRService } from '../services/cfr.service';

export class CFRController {
  private cfrService: CFRService;

  constructor() {
    this.cfrService = new CFRService();
  }

  // Conversas
  createConversa = async (req: Request, res: Response) => {
    const conversa = await this.cfrService.createConversa(req.body);
    res.status(201).json({
      status: 'success',
      data: conversa,
    });
  };

  getConversasByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const conversas = await this.cfrService.getConversasByUser(userId);

    res.json({
      status: 'success',
      data: conversas,
    });
  };

  // Feedbacks
  createFeedback = async (req: Request, res: Response) => {
    const feedback = await this.cfrService.createFeedback(req.body);
    res.status(201).json({
      status: 'success',
      data: feedback,
    });
  };

  getFeedbacksByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const feedbacks = await this.cfrService.getFeedbacksByUser(userId);

    res.json({
      status: 'success',
      data: feedbacks,
    });
  };

  // Reconhecimentos
  createReconhecimento = async (req: Request, res: Response) => {
    const reconhecimento = await this.cfrService.createReconhecimento(req.body);
    res.status(201).json({
      status: 'success',
      data: reconhecimento,
    });
  };

  getReconhecimentosByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const reconhecimentos = await this.cfrService.getReconhecimentosByUser(userId);

    res.json({
      status: 'success',
      data: reconhecimentos,
    });
  };
}
