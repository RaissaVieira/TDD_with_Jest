const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController')

// Definicao das rotas

routes.post('/sessions', SessionController.store);

module.exports = routes;