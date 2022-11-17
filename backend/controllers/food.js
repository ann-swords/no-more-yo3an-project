const Food = require('../models/Food')
const FoodContent = require('../models/FoodContent')
const Location = require('../models/Location')
mongoose = require('mongoose'),
User = require('../models/User')
const jwt_decode = require('jwt-decode')

const createFood = async (req, res) => {
    console.log("this is the create food function!!!")
    console.log("Request headers:")
    const user = jwt_decode(req.headers.authorization)
    console.log(user)

    console.log(req.body)

    try {
        const idOfUser = user.user.id
        let containsIdArray = req.body.contains 

        const newLocation = await Location.create({
            // city: req.body.city,
            block: req.body.block,
            road: req.body.road,
            building: req.body.building,
            flat: req.body.flat,
            lat: req.body.lat,
            lng: req.body.lng
        })


        if (containsIdArray === undefined){
            containsIdArray = []
        } else {
            containsIdArray.forEach(element => {
                element = mongoose.Types.ObjectId(element)
            });
        }

        const newFood = await Food.create({
            name: req.body.name,
            description: req.body.description,
            prodDate: req.body.prodDate,
            expDate: req.body.expDate,
            images: req.body.images,
    
            // to pass reference
            userDonateId: mongoose.Types.ObjectId(idOfUser),
    
            // // reference to person reserving the food
            userReserved: undefined,
    
            // reference the location table
            location: newLocation._id,

            // references the foodContent table
            contains: containsIdArray
        })

        let userDb = await User.findById(mongoose.Types.ObjectId(idOfUser))


        userDb.foods.push(newFood._id)
        await userDb.save()


        // Create location for food
        // const newLocation = await Location.create({
        //     // city: req.body.city,
        //     block: req.body.block,
        //     road: req.body.road,
        //     building: req.body.house,
        //     flat: req.body.flat,
        //     lat: req.body.lat,
        //     lng: req.body.lng
        // })
        
        console.log('food location', newLocation)
        
        // let updatedFood = await Food.findByIdAndUpdate(newFood._id, {location: newLocation._id})
        

        res.json({message: "Food got created"})

    } catch(err) {
        return res.json({error: "Error -> " + err}).status(400);
    }

}

const updateFoodStatus = async (req, res) => {
    try {
        const update = req.body;
        await Food.findByIdAndUpdate(req.params._id , update);
        res.status(200).json({message: 'Food Status Updated Successfully!'})
    } catch (err) {
        res.json(err)
    }
}

const getAllFood = async (req, res) => {

    try {
    
        const allFood = await Food.find({status: 'Available' })
    
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

const getAllLocations = async (req, res) => {
    
    try {

        let locations =  await Location.find({})

        res.send(locations)
    } catch (err) {
        res.send(err)
    }
}


const getFoodbyId = async (req,res) => {
    try{
        const food = await Food.findById(req.params.id);
        await food.populate(['location', 'contains', 'userReserved'])
        res.json(food);
    } catch(err){
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
    getFoodWithContent,
    updateFoodStatus,
    getAllLocations,
    getFoodbyId,
}