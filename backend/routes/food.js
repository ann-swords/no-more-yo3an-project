const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food')


router.post('/food', foodController.createFood)
router.get('/food', foodController.getAllFood)
router.get('/food/:_id', foodController.getFoodByIdWithUserDonatorDetails)
router.delete('/food/:_id', foodController.deleteFood)

router.get('/food-contents', foodController.getAllFoodContents)
router.post('/foodContent', foodController.createContent)

router.get('/foodContent/:_id', foodController.getFoodWithContent)

module.exports = router