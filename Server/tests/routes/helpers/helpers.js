const request = require('supertest');
require('@babel/polyfill');
const app = require('../../../app');
const faker = require('faker');

class Helpers {
    makeUser = (then, userData = {}) => {
        const pass = faker.internet.password(10);
        const defaultData = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: pass,
            password2: pass,
        };
        return request(app).post('/api/register').send({
            ...defaultData,
            ...userData,
        })
        .then(res => {
            then(res.body.data.id);
        });
    }

    makeBlogPost = then => {
        return this.makeUser(userId => {
            return request(app).post('/api/blogpost').send({
                title: faker.lorem.sentence(3),
                body: faker.lorem.paragraph(5),
                post_date: '2020-07-16 10:23:54-04',
                user_id: userId,
            })
            .then(res => {
                then(res.body.post.id);
            });
        });
    }
};

module.exports = { Helpers: new Helpers() };
