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

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  describe('POST /login', () => {
    it('should return 200 and body with object { token: "token" }', async () => {  
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

    it('should return 400 and a message error if the password is not provided', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

      response = await chai
         .request(app)
         .post('/login')
         .send({ email: validRequestData.email });
      
      expect(response.status).to.be.equals(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('should return 400 and a message error if the email is not provided', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

      response = await chai
         .request(app)
         .post('/login')
         .send({ password: validRequestData.password });
      
      expect(response.status).to.be.equals(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  });
});
