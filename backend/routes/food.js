const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food')


router.post('/food', foodController.createFood)
router.get('/food', foodController.getAllFood)
router.delete('/food/:_id', foodController.deleteFood)



module.exports = router