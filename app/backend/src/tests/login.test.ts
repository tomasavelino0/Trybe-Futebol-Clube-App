import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import userModel from '../database/models/users';
import UserloginServices from '../services/usersLogin.services';
const userService = new UserloginServices();
import { 
    requestWithoutEmail,
    requestWIthoutPassword,
    userFull, 
    userInvalid, 
    userValid} from './mocks/user.mock'
 
import { Response } from 'superagent';
import IUserFull from '../interfaces/userLogin';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao do endpoint /login e /login/validate', ()  => {
    afterEach(function () {
        sinon.restore();
      });
    describe('testes em caso de excecao', () => {
      it('Gera uma excecao ao receber a requisicao com "email" faltando', async () => {
        const { body, status } = await chai.request(app).post('/login').send(requestWithoutEmail);

        expect(body).to.deep.equal({ message: 'All fields must be filled' });
        expect(status).to.equal(400);
      });
      it('Gera uma excecao ao receber a requisicao com "password" faltando', async () => {
        const { body, status } = await chai.request(app).post('/login').send(requestWIthoutPassword);

        expect(body).to.deep.equal({ message: 'All fields must be filled' });
        expect(status).to.be.equal(400);
      });    
    });
      it('Gera uma excecao ao receber um User que nao existe no BD', async () => {
        sinon.stub(userService, "findByEmailDb").resolves(null)

        const { body , status } =  await chai.request(app).post('/login').send(userInvalid)
        
        expect(body).to.be.deep.equal({message: 'Incorrect email or password'})
        expect(status).to.be.equal(401)
    });

    describe('testes em caso de sucesso', () => {
      it('Deve retornar status 200 ao fazer um login com sucesso', async () => {
        sinon.stub(userService, "findByEmailDb").resolves(userFull as IUserFull | any)
    
        const { body , status } =  await chai.request(app).post('/login').send(userValid)
            
        expect(body).to.haveOwnProperty('token');
        expect(status).to.be.equal(200)
        });  
    });    
});