const request = require('supertest');
require('@babel/polyfill');
const app = require('../../app');
const resetDb = require('../../testkit');
const { Helpers } = require('./helpers/helpers');

describe('Blog Posts API', () => {

    beforeAll(() => {
        return resetDb();
    });
    
    it('GET /blogposts › should return 200 with posts', () => {
        return request(app).get('/api/blogposts')
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('posts');
        });
    });
    
    it('POST /blogpost › should insert new post', () => {
        return Helpers.makeUser(userId => {
            request(app).post('/api/blogpost').send({
                title: 'test',
                body: 'test body',
                post_date: '2020-07-16 10:23:54-04',
                user_id: userId,
            })
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('post');
                expect(res.body.post.id).not.toBeNull();
                expect(res.body.post.title).not.toBeNull();
                expect(res.body.post.body).not.toBeNull();
                expect(res.body.post.post_date).not.toBeNull();
                expect(res.body.post.user_id).not.toBeNull();
            });
        });
    });
    
    it('GET /blogpost/:id › should return 404 for missing post', () => {
        return request(app).get('/api/blogpost/9999999')
        .then(res => {
            expect(res.statusCode).toBe(404);
        });
    });
    
    it('GET /blogpost/:id › should return 200 for existing post', () => {
        return Helpers.makeBlogPost(postId => {
            request(app).get('/api/blogpost/' + postId)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('post');
                expect(res.body.post.id).not.toBeNull();
                expect(res.body.post.title).not.toBeNull();
                expect(res.body.post.body).not.toBeNull();
                expect(res.body.post.post_date).not.toBeNull();
                expect(res.body.post.user_id).not.toBeNull();
            });
        });
    });
});
