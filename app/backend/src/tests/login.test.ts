import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

const adminUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const user = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: 'secret_user',
};

describe('Testes da rota /login', () => {
  let chaiHttpResponse: Response;

  it('Deveria fazer login com sucesso e retornar um token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: adminUser.email, password: adminUser.password });
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Deveria retornar mensagem em casso de erro quando um dos campos não for preenchido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'password' });

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('All fields must be filled')
  });

  it('Deveria falhar se o usuário não existir', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'test_password' });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('Incorrect email or password');
  });

  it('Deveria falhar se a senha do usuário não estive correta', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: 'wrong_password' });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('Incorrect email or password');
  });

  it('Deveria falhar se o email do usuário não estive correto', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user.com', password: 'wrong_password' });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('Incorrect email or password');
  });

  it('Deveria logar com sucesso caso as informações inseridas estejam corretas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });

    const reqValidate = await chai
      .request(app)
      .get('/login/validate')
      .send()
      .set('Authorization', chaiHttpResponse.body.token);

    expect(reqValidate).to.have.status(200);
    expect(reqValidate.body).to.have.property('role');
  });

  it('Deveria falhar caso seja acessado com token inválido', async () => {
    sinon.stub(jwt, 'verify').resolves({role: 'admin'} as any);
    const result = await chai.request(app).get('/login/validate');

    expect(result.status).to.be.equal(400);
    expect(result.body).to.have.property('response');
    expect(result.body.response).to.be.equal('Token inexistente');
  });
});
