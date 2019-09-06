
// Importações
const BoxController = require('./controller/BoxController')
const FileController = require('./controller/FileController')
const AuthController = require('./controller/AuthController')
const AuthMiddleware = require('./middlewares/auth')

const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const routes = express.Router()

// Definições de rota
routes.post('/boxes', AuthMiddleware, BoxController.store)
routes.get('/boxes/:id', AuthMiddleware, BoxController.show)
routes.post('/boxes/:id/files', AuthMiddleware, multer(multerConfig).single('file'), FileController.store)
routes.post('/signup', AuthController.register)
routes.post('/signin', AuthController.signin)

module.exports = routes
