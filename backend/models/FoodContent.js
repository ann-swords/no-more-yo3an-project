const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const FoodContentModel = new Schema({
    contentName: {type: String, required: true},
},{
    timestamps: true
})

const FoodContent = mongoose.model('FoodContent', FoodContentModel)

module.exports = FoodContent