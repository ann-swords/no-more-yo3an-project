const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserModel = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobile:  {type: String},
    role: {
        type: String,
        enum: {
          values: ['Donator', 'Benefiter', 'Admin'],
          default: 'Donator',
          message: '{VALUE} is not supported',
        }
    },
    // OR
    // role: {type: {type: String, required: true, default: 'Benefiter'}},
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }],
    reserved: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }]
},{
    timestamps: true
})

const User = mongoose.model('User', UserModel)

module.exports = User