const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
require('../config/database')

const FoodContent = require('../models/FoodContent')


FoodContent.insertMany([
    {
        contentName: "Milk"
    },
    {
        contentName: "Fish"
    },
    {
        contentName: "Eggs"
    },
    {
        contentName: "Shellfish"
    },
    {
        contentName: "TreeNuts"
    },
    {
        contentName: "Peanuts"
    },
    {
        contentName: "Wheats"
    },
    {
        contentName: "Soybeans"
    },
]).then(() => console.log('Data Added successfully!'))
.catch(err => console.log(err))