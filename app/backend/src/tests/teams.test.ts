import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota /teams', () => {
  it('Deveria retornar com sucesso todos os times', async () => {
    const { status } = await chai.request(app).get('/teams')
    expect(status).to.equal(200)
  });

  it('Deveria retornar com sucesso um time pelo ID', async () => {
    const { status } = await chai.request(app).get('/teams/1')
    expect(status).to.equal(200)
  });

  it('Deveria falhar caso o ID do time seja inválido', async () => {
    const { status } = await chai.request(app).get('/teams/999')
    expect(status).to.equal(404)
  });
});
