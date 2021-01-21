const { User } = require('../../src/app/models');

describe('Athentication', () => {
    it('should receive JWT token when authenticated with valid credentials', async() => {
        const user = await User.create({
            name: 'Raissa',
            email: 'raissa@vieira',
            password_hash: '123456'
        });

        console.log(user);

        expect(user.email).toBe('raissa@vieira');
    });
});