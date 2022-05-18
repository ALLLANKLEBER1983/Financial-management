const req = require('supertest');
const app = require('../../src/app');

const MAIN_ROUT = '/accounts';
let user;

beforeAll(async () => {
   const res = await app.services.user.save({name: 'User account',mail: `${Date.now()}@mail.com`,passwd:'123456'});
   user = {...res[0]}
});

test('Deve inserir uma conta com sucesso', () => {
    return req(app).post(MAIN_ROUT)
    .send({ name: 'Acc #1', user_id:user.id})
    .then((result) => {
        expect(result.status).toBe(201);
        expect(result.body.name).toBe('Acc #1');
    });
})