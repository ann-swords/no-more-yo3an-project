const express = require('express')
const app = express()
require('dotenv').config()
require('./config/database')




app.listen(4000, () => {
    
    console.log('App listening on port 4000!')
    
})
