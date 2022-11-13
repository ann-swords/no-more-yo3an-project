const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food')


router.post('/food', foodController.createFood)
router.get('/food', foodController.getAllFood)
router.get('/food/:_id', foodController.getFoodByIdWithUserDonatorDetails)
router.delete('/food/:_id', foodController.deleteFood)



module.exports = router