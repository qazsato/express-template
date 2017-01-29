const request = require('supertest');
const app = require('../app');

describe('/', () => {
    it('TOP画面が表示されること', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    });
});
