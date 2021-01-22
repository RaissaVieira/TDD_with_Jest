const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories')

describe('Athentication', () => {
    beforeEach(async() => {
        await truncate();
    });

    it('should authenticated with valid credentials', async() => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        expect(response.status).toBe(200);
    });

    it('should not athenticate with invalid crendentials', async() => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123457'
            })

        expect(response.status).toBe(401);
    });

    it('should return jwt token when athenticated', async() => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        expect(response.body).toHaveProperty("token");
    });

    it('should be able to acess private routes when athenticated', async() => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not be able to acess private routes without JWT token', async() => {
        const response = await request(app)
            .get('/dashboard')

        expect(response.status).toBe(401);
    });

    it('should not be able to acess private routes with invalid JWT token', async() => {
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer 123123`);

        expect(response.status).toBe(401);
    });
});