import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

class MatchController {
  private service: MatchService;

  constructor(service: MatchService) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const bool = inProgress === 'true';
      const matchesInProgress = await this.service.getAllInProgress(bool);
      return res.status(200).json(matchesInProgress);
    }

    const matches = await this.service.getAll();

    res.status(200).json(matches);
  };
}

export default MatchController;
