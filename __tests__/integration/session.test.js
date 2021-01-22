const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate')

describe('Athentication', () => {
    beforeEach(async() => {
        await truncate();
    });

    it('should authenticated with valid credentials', async() => {
        const user = await User.create({
            name: 'Raissa',
            email: 'raissa@vieira',
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
        const user = await User.create({
            name: 'Raissa',
            email: 'raissa@vieira',
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
        const user = await User.create({
            name: 'Raissa',
            email: 'raissa@vieira',
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
});