const express = require('express')
const userController = require('../controllers/userController')
const { checkAuthenticated } = require('../utils/checkAuthenticated')

const router = express.Router()

router.get('/login', checkAuthenticated, userController.renderLogin)
router.post('/login', userController.auth)
router.get('/register', checkAuthenticated, userController.renderRegister)
router.post('/register', userController.createUser)
router.get('/logout', userController.logout)

module.exports = router
