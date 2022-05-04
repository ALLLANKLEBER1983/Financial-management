const supertest = require('supertest');

const app = require('../src/app.js');

test('Deve responder na raiz', () =>{
    return supertest(app).get('/')
    .then(res => {
        expect(res.status).toBe(200);
    });
});

