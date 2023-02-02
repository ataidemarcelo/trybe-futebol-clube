import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import Team from '../database/models/Team';
import Matches from '../database/models/Match';

import { app } from '../app';
import { leaderBoard, leaderBoardAway, leaderBoardHome, matchesMock, teamListMock } from './mock/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('"LeaderBoard Controller" Integration Tests', () => {
  let response: Response;

  afterEach(() => sinon.restore());

  describe('GET /leaderboard', () => {
    it('should return status 201 and a leaderBoard', async () => {  
      sinon
        .stub(Team, "findAll")
        .resolves(teamListMock as Team[]);

      sinon
        .stub(Matches, "findAll")
        .resolves(matchesMock as any);


      response = await chai
         .request(app)
         .get('/leaderboard');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(leaderBoard);
    });
  });

  describe('GET /leaderboard/home', () => {
    it('should return status 200 and a leaderBoardHome', async () => {  
      sinon
        .stub(Team, "findAll")
        .resolves(teamListMock as Team[]);

      sinon
        .stub(Matches, "findAll")
        .resolves(matchesMock as any);

      response = await chai
         .request(app)
         .get('/leaderboard/home');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(leaderBoardHome);
    });
  });

  describe('GET /leaderboard/away', () => {
    it('should return status 200 and a leaderBoardAway', async () => {  
      sinon
        .stub(Team, "findAll")
        .resolves(teamListMock as Team[]);

      sinon
        .stub(Matches, "findAll")
        .resolves(matchesMock as any);

      response = await chai
         .request(app)
         .get('/leaderboard/away');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(leaderBoardAway);
    });
  });
});
