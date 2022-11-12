const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.post('/users', userController.createUser)
router.post('/auth/signin', userController.auth_signin)


module.exports = router