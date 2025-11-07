import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AppError } from '../middleware/errorHandler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);
    res.status(201).json({
      status: 'success',
      data: user,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const users = await this.userService.findAll();
    res.json({
      status: 'success',
      data: users,
    });
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      status: 'success',
      data: user,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.update(id, req.body);

    res.json({
      status: 'success',
      data: user,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.userService.delete(id);

    res.status(204).send();
  };

  getDashboard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dashboard = await this.userService.getDashboard(id);

    res.json({
      status: 'success',
      data: dashboard,
    });
  };

  getTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.userService.getTeam(id);

    res.json({
      status: 'success',
      data: team,
    });
  };
}
