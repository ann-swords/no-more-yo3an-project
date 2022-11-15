const Food = require('../models/Food')
mongoose = require('mongoose'),
User = require('../models/User')
const jwt_decode = require('jwt-decode')

const createFood = async (req, res) => {
    console.log("this is the create food function!!!")
    console.log("Request headers:")
    const user = jwt_decode(req.headers.authorization)
    console.log(user)

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
            // contains: [{
            //     type: Schema.Types.ObjectId,
            //     ref: 'FoodContent'
            // }],
        })

        let user = await User.findById(mongoose.Types.ObjectId(req.body._id))
        
        let food = newFood;

        user.foods.push(food._id)

        await user.save()
    
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

const deleteFood = async (req, res) => {

    try {
            await Food.findByIdAndDelete(
            req.params._id
        )
        res.json({message: 'Food Deleted Successfully'})
    } catch (err) {
        res.json(err)
    }
}

const getFoodByIdWithUserDonatorDetails = async (req , res) => {
    try {
        let foodById = await Food.findById(req.params._id);
        await foodById.populate('userDonateId')
        res.json(foodById)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    createFood,
    getAllFood,
    deleteFood,
    getFoodByIdWithUserDonatorDetails
}