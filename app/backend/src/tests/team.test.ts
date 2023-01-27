import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';

import Team from '../database/models/Team';
import { teamsMock } from './mock/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('"Team Controller" Integration Tests', () => {
  let response: Response;

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findOne as sinon.SinonStub).restore();
  })

  describe('GET /teams', () => {
    it('should return status 200 and a list of all teams', async () => {  
      sinon
        .stub(Team, "findAll")
        .resolves(teamsMock as Team[]);

      response = await chai
         .request(app)
         .get('/teams');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock);
    });
  });

  describe('GET /teams/:id', () => {
    it('should return status 200 and a team found by ID', async () => {  
      sinon
        .stub(Team, "findOne")
        .resolves(teamsMock[0] as Team);
      const teamId = 1;  
  
      response = await chai
         .request(app)
         .get(`/teams/${teamId}`);
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock[0]);
    });
  });
});
