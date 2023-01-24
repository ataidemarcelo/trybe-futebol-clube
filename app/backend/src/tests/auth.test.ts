import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import { usersMock, validRequestData } from './mock/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('"Auth Controller" Integration Tests', () => {
  let response: Response;

  describe('POST /login', () => {
    it('should return status 200 and body with object { token: "token" }', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

      response = await chai
         .request(app)
         .post('/login')
         .send(validRequestData);
      
      expect(response.status).to.be.equals(200);
      expect(response.body).to.be.deep.equal({ token: 'token' });
    });
  });
});
