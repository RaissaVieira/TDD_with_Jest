const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController')
const auth = require('./app/middleware/auth');

// Definicao das rotas

routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
})

module.exports = routes;