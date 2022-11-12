const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food')


router.post('/food', foodController.createFood)
router.get('/food', foodController.getAllFood)


module.exports = router