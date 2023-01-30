import { Router } from 'express';

import Team from '../database/models/Team';
import Matches from '../database/models/Match';

const router: Router = Router();

const getMatchResults = (type: string, homeTeamGoals: number, awayTeamGoals: number) => {
  const matchVitory = type === 'homeTeam'
    ? homeTeamGoals > awayTeamGoals
    : homeTeamGoals < awayTeamGoals;

  const matchLoss = type === 'homeTeam'
    ? homeTeamGoals < awayTeamGoals
    : homeTeamGoals > awayTeamGoals;

  const matchDraw = homeTeamGoals === awayTeamGoals;

  return { matchVitory, matchLoss, matchDraw };
};

const calculateTotals = (type: string, currentMatch: any, currentTeam: any) => {
  const team = currentTeam;
  const {
    homeTeamGoals,
    awayTeamGoals,
  } = currentMatch;

  const results = getMatchResults(type, homeTeamGoals, awayTeamGoals);
  const { matchVitory, matchLoss, matchDraw } = results;

  if (matchLoss) team.totalLosses += 1;

  if (matchVitory) {
    team.totalVictories += 1;
    team.totalPoints += 3;
  }

  if (matchDraw) {
    team.totalDraws += 1;
    team.totalPoints += 1;
  }

  team.totalGames += 1;
};

const calculateGoals = (type: string, currentMatch: any, currentTeam: any) => {
  const match = currentMatch;
  const team = currentTeam;
  team.goalsOwn += type === 'homeTeam' ? match.awayTeamGoals : match.homeTeamGoals;
  team.goalsFavor += type === 'homeTeam' ? match.homeTeamGoals : match.awayTeamGoals;
  team.goalsBalance = team.goalsFavor - team.goalsOwn;
};

const calculateEfficiency = (currentTeam: any) => {
  const team = currentTeam;
  team.efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
};

const makeLeaderBoard = (classificationObject: any, matches: any, isHomeMatch: boolean) => {
  matches.forEach((currentMatch: any) => {
    // const isHomeMatch = true;
    const type = isHomeMatch ? 'homeTeam' : 'awayTeam';
    const homeTeamName = currentMatch[type].teamName;
    const homeTeamNameExistInObj = classificationObject[homeTeamName];

    if (homeTeamNameExistInObj) {
      const currentTeam = homeTeamNameExistInObj;

      calculateTotals(type, currentMatch, currentTeam);
      calculateGoals(type, currentMatch, currentTeam);
      calculateEfficiency(currentTeam);
    }
  });

  return classificationObject;
};

const makeGeneralLeaderBoard = (classificationObject: any, matches: any) => {
  const classificationHome = makeLeaderBoard(classificationObject, matches, true);
  const classificationOverall = makeLeaderBoard(classificationHome, matches, false);
  return classificationOverall;
};

const makeClassificationObject = (teamNameList: any) => {
  const classObj: any = {};
  teamNameList.forEach((teamName: any) => {
    classObj[teamName] = {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0.00',
    };
  });
  return classObj;
};

const sortByTotalPoints = (a: any, b: any) => b.totalPoints - a.totalPoints;

const sortByTotalVictories = (a: any, b: any) => {
  if (b.totalPoints === a.totalPoints) {
    return b.totalVictories - a.totalVictories;
  }
};

const sortByGoalsBalance = (a: any, b: any) => {
  if (b.totalPoints === a.totalPoints && b.totalVictories === a.totalVictories) {
    return b.goalsBalance - a.goalsBalance;
  }
};

const sortByGoalsFavor = (a: any, b: any) => {
  if (b.totalPoints === a.totalPoints
    && b.totalVictories === a.totalVictories
    && b.goalsBalance === a.goalsBalance
  ) {
    return b.goalsFavor - a.goalsFavor;
  }
};

const sortByGoalsOwn = (a: any, b: any) => {
  if (b.totalPoints === a.totalPoints
    && b.totalVictories === a.totalVictories
    && b.goalsBalance === a.goalsBalance
    && b.goalsFavor === a.goalsFavor
  ) {
    return b.goalsOwn - a.goalsOwn;
  }
};

const sortBySortingRules = (board: any) =>
  board
    .sort(sortByTotalPoints)
    .sort(sortByTotalVictories)
    .sort(sortByGoalsBalance)
    .sort(sortByGoalsFavor)
    .sort(sortByGoalsOwn);

router.get('/', async (_req, res) => {
  const teams = Object.values(await Team.findAll({
    attributes: ['teamName'],
    raw: true,
  }));

  const teamNamesList = teams.map((team) => team.teamName);
  const classificationObject: any = makeClassificationObject(teamNamesList);

  const matches = await Matches.findAll({
    where: {
      inProgress: false,
    },
    include: [
      { model: Team, as: 'homeTeam' },
      { model: Team, as: 'awayTeam' },
    ],
  });
  const board: any = Object.values(makeGeneralLeaderBoard(classificationObject, matches));
  const leaderBoard = sortBySortingRules(board);
  res.status(200).json(leaderBoard);
});

router.get('/away', async (_req, res) => {
  const teams = Object.values(await Team.findAll({
    attributes: ['teamName'],
    raw: true,
  }));

  const teamNamesList = teams.map((team) => team.teamName);
  const classificationObject: any = makeClassificationObject(teamNamesList);

  const matches = await Matches.findAll({
    where: {
      inProgress: false,
    },
    include: [
      { model: Team, as: 'homeTeam' },
      { model: Team, as: 'awayTeam' },
    ],
  });
  const board: any = Object.values(makeLeaderBoard(classificationObject, matches, false));
  const leaderBoard = sortBySortingRules(board);
  res.status(200).json(leaderBoard);
});

router.get('/home', async (_req, res) => {
  const teams = Object.values(await Team.findAll({
    attributes: ['teamName'],
    raw: true,
  }));

  const teamNamesList = teams.map((team) => team.teamName);
  const classificationObj: any = makeClassificationObject(teamNamesList);

  const matches = await Matches.findAll({
    where: {
      inProgress: false,
    },
    include: [
      { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });
  const board: any = Object.values(makeLeaderBoard(classificationObj, matches, true));
  const leaderBoard = sortBySortingRules(board);
  res.status(200).json(leaderBoard);
});

export default router;
