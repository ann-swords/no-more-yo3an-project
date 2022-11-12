const Food = require('../models/Food')
var mongoose = require('mongoose');

const createFood = async (req, res) => {

    try {

        const newFood = await Food.create({
            name: req.body.name,
            description: req.body.description,
            prodDate: req.body.prodDate,
            expDate: req.body.expDate,
            images: req.body.images,
    
            // to pass reference
            userDonateId: mongoose.Types.ObjectId(req.body.userDonateId),
    
            // reference to person reserving the food
            userReserved: mongoose.Types.ObjectId(req.body.userReserved),
    
            // reference the location table
            location: mongoose.Types.ObjectId(req.body.location),
    
    
            // references the foodContent table
            contains: [{
                type: Schema.Types.ObjectId,
                ref: 'FoodContent'
            }],
        })
    
        res.json({message: "Food got created"})

    } catch(err) {
        res.json(err)
    }

}


const getAllFood = async (req, res) => {

    try {
    
        const allFood = await Food.find({})
    
        res.send(allFood)

    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    createFood,
    getAllFood
}