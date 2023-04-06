const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
require('dotenv').config()
require('./config/database')

//Middleware:
const buildPath = path.join(__dirname, 'build')
app.use(express.static(buildPath))
app.use(cors())
app.use(express.json())
app.use(express.raw({type: 'application/octet-stream'}))
// app.use(express.urlencoded({extended: true}))

// Mount:
app.use('/', require('./routes/users'))
app.use('/', require('./routes/food'))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

app.listen(4000, () => {
    
    console.log('App listening on port 4000!')
    
})
