const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const FoodModel = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    
    //production date of food
    // by default it will give the current date
    prodDate: {type: Date, default: Date.now, required: true},
    expDate: {type: Date, required: true},

    // array of strings
    images: [String],

    // reference to person that donates the food of User table
    userDonateId: {type: mongoose.Types.ObjectId, ref: "User"},

    // Idle is not selected
    status: {
        type: String,
        enum : ['Available','Reserved','Collected'],
        default: 'Available'
    },

    // reference to person reserving the food
    userReserved: {type: mongoose.Types.ObjectId, ref: "User"},

    // reference the location table
    location: {type: mongoose.Types.ObjectId, ref: "Location"},


    // references the foodContent table
    contains: [{
        type: Schema.Types.ObjectId,
        ref: 'FoodContent'
    }],
},{
    timestamps: true
})

const Food = mongoose.model('Food', FoodModel)

module.exports = Food