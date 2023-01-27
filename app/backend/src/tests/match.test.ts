import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';
import Match from '../database/models/Match';
import { matchMock, matchMockRequest, matchWithSameTeam } from './mock/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('"Match Controller" Integration Tests', () => {
  let response: Response;

  afterEach(()=>{
    (Match.create as sinon.SinonStub).restore();
  })

  describe('POST /Matches', () => {
    it('should return status 201 and a new Match', async () => {  
      sinon
        .stub(Match, "create")
        .resolves(matchMock as Match);

      response = await chai
         .request(app)
         .post('/matches')
         .send(matchMockRequest);
      
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(matchMock);
    });

    it('should return status 422 and an error message', async () => {  
      sinon
        .stub(Match, "create")
        .resolves(matchMock as Match);

      response = await chai
         .request(app)
         .post('/matches')
         .send(matchWithSameTeam);
      
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ 
        message: 'It is not possible to create a match with two equal teams' });
    });
  });
});
