import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsServices from '../services/teams.services';
const teamServices = new TeamsServices();
import { allTeamsMock, teamByIdMock } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes de integracao da rota /teams', () => {
    afterEach(function () {
        sinon.restore();
      });
    it('Deve retornar um array com todos times do DB', async () => {
        sinon.stub(teamServices, 'getAllTeams').resolves(allTeamsMock)
        const { body, status } =  await chai.request(app).get('/teams')

         expect(status).to.be.equal(200)
         expect(body).to.be.deep.equal(allTeamsMock)
      });
    it('Deve retornar um time pelo seu ID caso ele exista no DB', async () => {
        sinon.stub(teamServices, 'getTeamById').resolves(teamByIdMock)
        const { body, status } = await chai.request(app).get('/teams/1')

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(teamByIdMock)
      });
    it('deve retornar status 401 e uma mensagem de erro', async () => {
        sinon.stub(teamServices, 'getTeamById').resolves(null)
        const { body, status } = await chai.request(app).get('/teams/392893');

        expect(status).to.be.equal(401)
        expect(body).to.be.deep.equal({ message: 'not found' })
      });     
  }); 