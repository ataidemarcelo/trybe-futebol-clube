import { Request, Response } from 'express';

import { UnprocessableEntityException } from '../exceptions';
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

  public create = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeamId === awayTeamId) {
      throw new UnprocessableEntityException(
        'It is not possible to create a match with two equal teams',
      );
    }

    const matchData = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    };

    const newMatch = await this.service.create(matchData);

    res.status(201).json(newMatch);
  };
}

export default MatchController;
