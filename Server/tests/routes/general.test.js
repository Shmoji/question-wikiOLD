const request = require('supertest');
require('@babel/polyfill');
const app = require('../../app');
const resetDb = require('../../testkit');

describe('General Routes', () => {
    
    it('GET / › should return 200 with message', () => {
        return request(app).get('/')
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
        });
    });
    
    it('GET /about › should return 200 with message', () => {
        return request(app).get('/about')
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
        });
    });
});
