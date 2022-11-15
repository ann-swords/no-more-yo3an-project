const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food');
const isLoggedIn = require('../helper/isLoggedIn');


router.post('/food',isLoggedIn, foodController.createFood)
router.get('/food', foodController.getAllFood)
router.get('/food/:_id', foodController.getFoodByIdWithUserDonatorDetails)
router.delete('/food/:_id', foodController.deleteFood)



module.exports = router