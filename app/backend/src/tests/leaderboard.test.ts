import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota /leaderboard', () => {
  it('Deveria retornar com sucesso a classificação geral do campeonato', async () => {
    const { status, body } = await chai.request(app).get('/leaderboard');
    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
  });

  it('Deveria retornar com sucesso a classificação das partidas em casa do campeonato', async () => {
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
  });

  it('Deveria retornar com sucesso a classificação das partidas fora de casa do campeonato', async () => {
    const { status, body } = await chai.request(app).get('/leaderboard/away');
    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
  });

});
