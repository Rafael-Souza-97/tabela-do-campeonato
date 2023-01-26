import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);
const { expect } = chai;


describe('Testes da rota /teams', () => {
  it('Deveria retornar com sucesso todos os times', async () => {
    const response = await chai.request(app).get('/teams')
    expect(response.status).to.equal(200)
  });

  it('Deveria retornar com sucesso um time pelo ID', async () => {
    const response = await chai.request(app).get('/teams/1')
    expect(response.status).to.equal(200)
  });

  it('Deveria falhar caso o ID do time seja inválido', async () => {
    const response = await chai.request(app).get('/teams/999')
    expect(response.status).to.equal(404)
  });
});
