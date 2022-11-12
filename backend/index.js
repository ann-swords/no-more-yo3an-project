const express = require('express')
const app = express()
require('dotenv').config()
require('./config/database')

app.use(express.json())
app.use('/', require('./routes/users'))

app.listen(4000, () => {
    
    console.log('App listening on port 4000!')
    
})
