const isLoggedIn = require('../helper/isLoggedIn')

const express = require('express')
router = express.Router(),
userController = require('../controllers/users')

router.get('/users/food', isLoggedIn, userController.getUsersDonates)
router.post('/users/:userId', userController.updateUser)
router.post('/users', userController.createUser)
router.post('/auth/signin', userController.auth_signin)
router.get('/users/:userId', userController.getUserById)


module.exports = router