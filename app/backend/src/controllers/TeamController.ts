import { Request, Response } from 'express';

import TeamService from '../services/TeamService';

class TeamController {
  private service: TeamService;

  constructor(service: TeamService) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    const teams = await this.service.getAll();

    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.service.getById(Number(id));

    res.status(200).json(team);
  };
}

export default TeamController;
