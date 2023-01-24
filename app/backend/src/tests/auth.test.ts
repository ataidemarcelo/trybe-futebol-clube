import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('"Auth Controller" Integration Tests', function () {
  let response: Response;

  describe('POST /login', function () {  
    it('should return status 200 and body with object { token: "token" }', async () => {
      response = await chai
         .request(app)
         .post('/login')
      
      expect(response.status).to.be.equals(200);
      expect(response.body).to.be.deep.equal({ token: 'token' });
    });
  });
});
