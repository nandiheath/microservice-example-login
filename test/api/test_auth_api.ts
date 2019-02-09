import * as chai from 'chai';
import chaiHttp = require('chai-http');
// https://stackoverflow.com/questions/39415661/
// what-does-resolves-to-a-non-module-entity-and-cannot-be-imported-using-this
import server from '../../src/server';

import { ERROR_ENTITY_INVALID_REQUEST, ERROR_USER_ALREADY_EXISTS,
  ERROR_TOKEN_EXPIRED, ERROR_WRONG_CREDENTIAL } from '../../src/utils/api_error';
import pa from './../../src/persistence/persistence_adapter';

chai.use(chaiHttp);
const { expect } = chai;

describe('api', () => {

  afterEach(() => {
    pa.cleanup();
  });

  describe('/register', () => {

    it('it should register a new user', async () => {
      const res = await chai.request(server).post('/register').type('json').send({
        username: 'abc',
        password: 'abc'
      });
      expect(res.status).to.be.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.data.access_token).to.be.not.null;
      expect(res.body.data.access_token).to.be.not.undefined;
      expect(res.body.data.access_token).to.be.a('string');
    });

    it('it should return error 401 if username is not provided', async() => {
      let res = await chai.request(server).post('/register').type('json').send({
        password: 'abc',
      });
      expect(res.status).to.be.eq(400);
      expect(res.body.error_code).to.be.eq(ERROR_ENTITY_INVALID_REQUEST);
      expect(res.body.error_message).to.be.contains('username');

    });

    it('it should return error 401 if password is not provided', async() => {
      let res = await chai.request(server).post('/register').type('json').send({
        username: 'abc'
      });
      expect(res.status).to.be.eq(400);
      expect(res.body.error_code).to.be.eq(ERROR_ENTITY_INVALID_REQUEST);
      expect(res.body.error_message).to.be.contains('password');

    });

    it('it should return error for duplicated username', async() => {
      var requester = chai.request(server).keepOpen();
      let res = await requester.post('/register').type('json').send({
        username: 'abc',
        password: 'abc',
      });
      expect(res.status).to.be.eq(200);

      res = await requester.post('/register').type('json').send({
        username: 'abc',
        password: 'abc',
      });
      expect(res.status).to.be.eq(400);
      expect(res.body.error_code).to.be.eq(ERROR_USER_ALREADY_EXISTS);

     requester.close();
    });
  });

  describe('login', () => {
    it('it should be able to login after register', async () => {
      let res;
      res = await chai.request(server).post('/register').type('json').send({
        username: 'abc',
        password: 'abc'
      });
      expect(res.status).to.be.eq(200);

      res = await chai.request(server).post('/login').type('json').send({
        username: 'abc',
        password: 'abc'
      });
      expect(res.status).to.be.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.data.access_token).to.be.not.null;
      expect(res.body.data.access_token).to.be.not.undefined;
      expect(res.body.data.access_token).to.be.a('string');
    });

    it('it should return error 400 if username is not provided', async() => {
      let res = await chai.request(server).post('/login').type('json').send({
        password: 'abc',
      });
      expect(res.status).to.be.eq(400);
      expect(res.body.error_code).to.be.eq(ERROR_ENTITY_INVALID_REQUEST);
      expect(res.body.error_message).to.be.contains('username');

    });

    it('it should return error 400 if password is not provided', async() => {
      // First register a user
      let res;
      res = await chai.request(server).post('/register').type('json').send({
        username: 'abc',
        password: 'abc'
      });
      expect(res.status).to.be.eq(200);

      res = await chai.request(server).post('/login').type('json').send({
        username: 'abc'
      });
      expect(res.status).to.be.eq(400);
      expect(res.body.error_code).to.be.eq(ERROR_ENTITY_INVALID_REQUEST);
      expect(res.body.error_message).to.be.contains('password');

    });

    it('it should return error if password is not correct', async() => {
      let res = await chai.request(server).post('/register').type('json').send({
        username: 'abc',
        password: 'abc',
      });
      expect(res.status).to.be.eq(200);

      res = await chai.request(server).post('/login').type('json').send({
        username: 'abc',
        password: 'abcd',
      });
      expect(res.status).to.be.eq(401);
      expect(res.body.error_code).to.be.eq(ERROR_WRONG_CREDENTIAL);
    });

    it('it should return error if user does not exist', async() => {
      let res = await chai.request(server).post('/login').type('json').send({
        username: 'abc',
        password: 'abc',
      });
      expect(res.status).to.be.eq(401);
      expect(res.body.error_code).to.be.eq(ERROR_WRONG_CREDENTIAL);
    });

  });
});
