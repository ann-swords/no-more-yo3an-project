const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const LocationModel = new Schema({
    governorate: {type: String, required: true},
    city: {type: String, required: true},
    block: {type: String, required: true},
    road: {type: String, required: true},
    house: {type: String, required: true},
    mapsInfo:  {type: String}
},{
    timestamps: true
})

const Location = mongoose.model('Location', LocationModel)

module.exports = Location