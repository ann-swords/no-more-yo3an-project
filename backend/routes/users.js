const express = require('express'),
router = express.Router(),
userController = require('../controllers/users')

router.post('/users/:userId', userController.updateUser)
router.post('/users', userController.createUser)
router.post('/auth/signin', userController.auth_signin)
router.get('/users/:userId', userController.getUserById)


module.exports = router