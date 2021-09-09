// made
const twitter = require('./twitter')
const configs = require('./config')

// node 
const express = require('express')
const path = require('path')

// creating the app
const app = express()

const PORT = configs.server_configs.port || 6969

// middlewares
app.use(express.static(path.join(__dirname, 'public')))

// routes
// home
app.get('/', (req, res, err) => {
    
    res.sendFile('index.html')

})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})



