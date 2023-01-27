import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { sign } from 'jsonwebtoken';

import { app } from '../app';

import User from '../database/models/User';
import { usersMock, validRequestAdmin, validRequestData, validRequestUser } from './mock/auth.mock';
import { jwtSecret } from '../utils/jwt.config';

chai.use(chaiHttp);

const { expect } = chai;

describe('"Auth Controller" Integration Tests', () => {
  let response: Response;

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  describe('POST /login', () => {
    it('should return status 200 and an object with token property', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

      response = await chai
         .request(app)
         .post('/login')
         .send(validRequestData);
      
      expect(response.status).to.be.equals(200);
      expect(response.body).to.haveOwnProperty('token');
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

    it('should return 401 and a message error if the email is not authorized', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

      response = await chai
         .request(app)
         .post('/login')
         .send({
            email: 'unauthorized_email@mail.com',
            password: 'unauthorized_password' 
          });
      
      expect(response.status).to.be.equals(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('should return 401 and a message error if the password is not authorized', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

      response = await chai
         .request(app)
         .post('/login')
         .send({
            email: validRequestData.email,
            password: 'unauthorized_password' 
          });
      
      expect(response.status).to.be.equals(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe('GET /login/validate', () => {
    it('should return status 200 and an object with { role: "admin" }', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

        const token = sign({ sub: 'admin' }, jwtSecret.secret);

      response = await chai
         .request(app)
         .get('/login/validate')
         .set('Authorization', token)
         .send(validRequestAdmin);
      
      expect(response.status).to.be.equals(200);
      expect(response.body).to.be.deep.equal({ role: 'admin' });
    });

    it('should return status 200 and an object with { role: "user" }', async () => {  
      sinon
        .stub(User, "findOne")
        .resolves(usersMock[0] as User);

        const token = sign({ sub: 'user' }, jwtSecret.secret);

      response = await chai
         .request(app)
         .get('/login/validate')
         .set('Authorization', token)
         .send(validRequestUser);
      
      expect(response.status).to.be.equals(200);
      expect(response.body).to.be.deep.equal({ role: 'user' });
    });
  });
});
