const routes = require('express').Router();
const { User } = require('./app/models')

// Definicao das rotas

User.create({
    name: 'Raissa',
    email: 'raissa@vieira',
    password_hash: '1234567890'
})

module.exports = routes;