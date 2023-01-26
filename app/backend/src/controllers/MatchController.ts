import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

class MatchController {
  private service: MatchService;

  constructor(service: MatchService) {
    this.service = service;
  }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.service.getAll();

    res.status(200).json(matches);
  };
}

export default MatchController;
