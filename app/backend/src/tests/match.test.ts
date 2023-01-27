import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock =  {
  home_team_id: 16,
  home_team_goals: 1,
  away_team_id: 8,
  away_team_goals: 1,
  in_progress: false,
}

const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwiaWF0IjoxNjc0Nzc5MzkyLCJleHAiOjE2NzQ4NjU3OTJ9.IbGE50x30nm-vuLwytWhuRFBUC-iib_5_2a2zq65LkU";


describe('Testes da rota /matches', () => {
  afterEach(sinon.restore);
  it('Deveria retornar todas as partidas com sucesso', async () => {
    const { status } = await chai.request(app).get('/matches')
    expect(status).to.equal(200)
  });

  it('Deveria retornar todas as partidas que estão em andamento com sucesso', async () => {
    const { status } = await chai.request(app).get('/matches?inProgress=true')
    expect(status).to.equal(200)
  });

  it('Deveria retornar todas as partidas que já finalizaram com sucesso', async () => {
    const { status } = await chai.request(app).get('/matches?inProgress=false')
    expect(status).to.equal(200)
  });

  it('Deveria ser possível atualizar um jogo', async () => {
    const { status }= await chai.request(app)
      .patch('/matches/1').set('Authorization', tokenMock).send({
        homeTeamGoals: 1,
        awayTeamGoals: 1
      });
    expect(status).to.be.equal(200);
  });

  it('Deveria falhar ao criar uma partida com um token inválido', async () => {
    const { status } = await chai.request(app)
      .post('/matches').set('Authorization', 'invalidToken').send(matchMock);
    expect(status).to.be.equal(401);
  });

  it('Deveria falhar ao criar uma partida sem um token', async () => {
    const { status } = await chai.request(app).post('/matches').send(matchMock);
    expect(status).to.be.equal(401);
  });

  it('Deveria ser possível finalizar uma partida', async () => {
    const { status } = await chai.request(app).patch('/matches/1/finish')
    expect(status).to.be.equal(200);
  });
});
