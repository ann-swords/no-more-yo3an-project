const express = require('express'),
router = express.Router(),
userController = require('../controllers/users')

router.post('/users', userController.createUser)
router.post('/auth/signin', userController.auth_signin)


module.exports = router