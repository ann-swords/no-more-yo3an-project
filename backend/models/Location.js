const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const LocationModel = new Schema({
    // governorate: {type: String, required: true},
    // city: {type: String, required: true},
    block: {type: String, required: true},
    road: {type: String, required: true},
    building: {type: String, required: true},
    flat: {type: String},
    lat: {type: String, },
    lng: {type: String,}
},{
    timestamps: true
})

const Location = mongoose.model('Location', LocationModel)

module.exports = Location