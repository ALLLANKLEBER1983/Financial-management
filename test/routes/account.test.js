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

test('Deve listar todas contas', () => {
    return app.db('accounts')
    .insert({ name: 'Acc #1', user_id:user.id})
    .then(() => req(app).get(MAIN_ROUT))
    .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0)
    })
})

test('Deve retornar uma conta por id', () => {
    return app.db('accounts')
    .insert({ name: 'Acc by id', user_id:user.id}, ['id'])
    .then(acc => req(app).get(`${MAIN_ROUT}/${acc[0].id}`))
    .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Acc by id');
        expect(res.body.user_id).toBe(user.id)

    })

})

test('Deve alterar uma conta', () => {
    return app.db('accounts')
    .insert({ name: 'Acc to Update', user_id:user.id}, ['id'])
    .then(acc => req(app).put(`${MAIN_ROUT}/${acc[0].id}`)
        .send({name: 'Acc Update'}))
    .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Acc Update')
        })
})