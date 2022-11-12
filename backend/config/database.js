const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

mongoose.connection.on('connected', () => {
    console.log('Connected to database!')
})
