const express = require('express')
const registerUser = require('../controller/register')
const login = require('../controller/login')
const Router = express.Router()

Router.post('/register',registerUser)
Router.post('/login',login)

module.exports = Router