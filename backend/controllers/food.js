const Food = require('../models/Food')
const FoodContent = require('../models/FoodContent')
const Location = require('../models/Location')
mongoose = require('mongoose'),
User = require('../models/User')

const createFood = async (req, res) => {

    try {

        console.log(req.body)
        console.log('name', req.body.name)

        let containsIdArray = req.body.contains 

        containsIdArray.forEach(element => {
            element = mongoose.Types.ObjectId(element)
        });

        const newFood = await Food.create({
            name: req.body.name,
            description: req.body.description,
            prodDate: req.body.prodDate,
            expDate: req.body.expDate,
            images: req.body.images,
    
            // to pass reference
            userDonateId: mongoose.Types.ObjectId(req.body.userDonateId),
    
            // reference to person reserving the food
            userReserved: (req.body.userReserved),
    
            // reference the location table
            // location: mongoose.Types.ObjectId(req.body.location),

            


            // references the foodContent table
            contains: containsIdArray
        })

        let user = await User.findById(mongoose.Types.ObjectId(req.body._id))
        
        let food = newFood;

        user.foods.push(food._id)

        await user.save()
    

        /*
            governorate: {type: String, required: true},
            city: {type: String, required: true},
            block: {type: String, required: true},
            road: {type: String, required: true},
            house: {type: String, required: true},

            // can be [arrays of string] that represents latitude and longitude
            // or it can be [float number]   so [lat, len]

            mapsInfo:  {type: String}
        */

        // Create location for food
        let foodLocation = await Location.create({
            governorate: req.body.location.governorate,
            city: req.body.location.city,
            block: req.body.location.block,
            road: req.body.location.road,
            house: req.body.location.house,
            mapsInfo: [parseFloat(req.body.mapsInfo.lat), parseFloat(req.body.mapsInfo.len)]
        })
        
        
        let updatedUser = await user.findByIdAndUpdate(user._id, {location: foodLocation._id})
        

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


const createContent = async (req, res) => {
    try {

        let newContent = await FoodContent.create({
            contentName: req.body.contentName
        })

        res.json(newContent)
    
    }catch (err){
        res.json(err)
    }
}


const getAllFoodContents = async (req, res) => {
    try {

        let allFoodContents = await FoodContent.find({})

        res.json(allFoodContents)

    }catch(err) {
        res.json(err)
    }
}


const getFoodWithContent = async (req , res) => {
    try {
        let foodById = await Food.findById(req.params._id).populate('contains')
        res.json(foodById)
    } catch (err) {
        res.json(err)
    }
}


module.exports = {
    createFood,
    getAllFood,
    deleteFood,
    getFoodByIdWithUserDonatorDetails,
    createContent,
    getAllFoodContents,
    getFoodWithContent
}