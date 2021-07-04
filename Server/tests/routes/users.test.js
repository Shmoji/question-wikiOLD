const request = require('supertest');
require('@babel/polyfill');
const app = require('../../app');
const resetDb = require('../../testkit');
const { Helpers } = require('./helpers/helpers');
const faker = require('faker');

describe('Users API', () => {

    beforeAll(() => {
        return resetDb();
    });

    it('POST /register › should return 200 with user ID when given valid user data', () => {
        return request(app).post('/api/register').send({
            firstname: 'Bigleschnap',
            lastname: 'Humperdink',
            email: 'bingleschnap@example.com',
            password:  'Wu@a8U@v#$22496Js0ZV',
            password2: 'Wu@a8U@v#$22496Js0ZV',
        })
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('id');
        });
    });
    
    it('POST /register › should return 400 when given differing passwords', () => {
        return request(app).post('/api/register').send({
            firstname: 'Bigleschnap',
            lastname: 'Humperdink',
            email: 'bingleschnap@example.com',
            password:  'Wu@a8U@v#$22496Js0ZV',
            password2: 'differentdifferent',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
    
    it('POST /register › should return 400 when missing firstname', () => {
        return request(app).post('/api/register').send({
            firstname: '',
            lastname: 'Humperdink',
            email: 'bingleschnap@example.com',
            password:  'Wu@a8U@v#$22496Js0ZV',
            password2: 'Wu@a8U@v#$22496Js0ZV',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
    
    it('POST /register › should return 400 when missing lastname', () => {
        return request(app).post('/api/register').send({
            firstname: 'Bigleschnap',
            lastname: '',
            email: 'bingleschnap@example.com',
            password:  'Wu@a8U@v#$22496Js0ZV',
            password2: 'Wu@a8U@v#$22496Js0ZV',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
    
    it('POST /register › should return 400 when missing email', () => {
        return request(app).post('/api/register').send({
            firstname: 'Bigleschnap',
            lastname: 'Humperdink',
            email: '',
            password:  'Wu@a8U@v#$22496Js0ZV',
            password2: 'Wu@a8U@v#$22496Js0ZV',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
    
    it('POST /register › should return 400 with invalid email', () => {
        return request(app).post('/api/register').send({
            firstname: 'Bigleschnap',
            lastname: 'Humperdink',
            email: 'invalid',
            password:  'Wu@a8U@v#$22496Js0ZV',
            password2: 'Wu@a8U@v#$22496Js0ZV',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
    
    it('POST /register › should return 400 with short password', () => {
        return request(app).post('/api/register').send({
            firstname: 'Bigleschnap',
            lastname: 'Humperdink',
            email: 'bingleschnap@example.com',
            password:  'test',
            password2: 'test',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });

    it('GET /users › should get a list of users', () => {
        return Helpers.makeUser(userId => {
            request(app).get('/api/users')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('data');
                expect(res.body.data.length).toBeGreaterThan(0);
            });
        });
    });

    it('GET /user/:id › should get a 404 when no user exists for given ID', () => {
        return request(app).get('/api/user/99999999')
            .then(res => {
                expect(res.statusCode).toBe(404);
            });
    });

    it('GET /user/:id › should get user data for a given valid ID', () => {
        return Helpers.makeUser(userId => {
            request(app).get('/api/user/' + userId)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
            });
        });
    });

    it('GET /user/:id/questions › should get 404 for user without questions', () => {
        return Helpers.makeUser(userId => {
            request(app).get('/api/user/' + userId + '/questions')
            .then(res => {
                expect(res.statusCode).toBe(404);
            });
        });
    });

    it('GET /user/:id › should get a 404 when no user exists', () => {
        return request(app).get('/api/user/99999999/questions')
            .then(res => {
                expect(res.statusCode).toBe(404);
            });
    });

    it('POST /login › should get a 400 error when supplying empty password', () => {
        return request(app).post('/api/login')
        .send({
            email: 'test@example.com',
            password: '',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });

    it('POST /login › should get a 400 error when supplying empty email', () => {
        return request(app).post('/api/login')
        .send({
            email: '',
            password: '1234567890',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });

    it('POST /login › should get a 400 error when supplying invalid email', () => {
        return request(app).post('/api/login')
        .send({
            email: 'notvalid',
            password: '1234567890',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });

    it('POST /login › should get a 400 error when user does not exist in the system', () => {
        return request(app).post('/api/login')
        .send({
            email: 'test@example.com',
            password: '1234567890',
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });

    it('POST /login › should get a 400 error when supplying incorrect password', () => {
        const password = faker.internet.password(10);
        const userData = {
            email: faker.internet.email(),
            password,
            password2: password,
        };
        return Helpers.makeUser(userId => {
            request(app).post('/api/login')
            .send({
                email: userData.email,
                pass: 'wrongpassword',
            })
            .then(res => {
                expect(res.statusCode).toBe(400);
            });
        }, userData);
    });

    it('POST /login › should get a 200 with a token for valid login', () => {
        const password = faker.internet.password(10);
        const userData = {
            email: faker.internet.email(),
            password,
            password2: password,
        };
        return Helpers.makeUser(userId => {
            request(app).post('/api/login')
            .send(userData)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('token');
            });
        }, userData);
    });
});

/**
 * Tests needed:
 * 1. Test that we can get a list of questions for a user who has posted questions. (Depends on having a helper for making a question.)
 */
