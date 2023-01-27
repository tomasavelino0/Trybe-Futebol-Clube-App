import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesServices from '../services/matches.services';
const matchesServices = new MatchesServices();
import {userValid} from './mocks/user.mock'
import { 
    matcheMock, 
    matchesInprogressTrueMock,
    matchCreateMock,
    matchSendMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes de integracao da rota /matches', () => {
    afterEach(function () {
        sinon.restore();
      });

    it('deve retornar todas as partidas do DB', async () => {
        sinon.stub(matchesServices, 'getAllMatches').resolves(matcheMock)
        const { body, status } =  await chai.request(app).get('/matches')
       
        expect(status).to.be.equal(200)
        expect(body).to.be.deep.equal(matcheMock)
    });

    it('deve retornar as partidas com o atributo inProgress= true', async () => {
        sinon.stub(matchesServices, 'getAllMatches').resolves(matchesInprogressTrueMock)
        const { body, status } =  await chai.request(app).get('/matches?inProgress=true')
        
        expect(status).to.be.equal(200)
        expect(body).to.be.deep.equal(matchesInprogressTrueMock) 
    });

    it('cria com sucesso uma partida e retorna um objeto referente a partida', async () => {
        sinon.stub(matchesServices, 'createMatch').resolves(matchCreateMock);
        const responseToken = await chai.request(app).post("/login").send(userValid)
        
        const { body, status } = await chai.request(app).post("/matches").send(matchSendMock).set('Authorization', responseToken.body.token)
        expect(status).to.be.equal(201);
        expect(body).to.be.deep.equal(matchCreateMock)
    })
})