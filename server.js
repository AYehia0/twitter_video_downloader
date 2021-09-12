// made
const twitter = require('./twitter')
const configs = require('./config')

// node 
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// creating the app
const app = express()

const PORT = configs.server_configs.port || 6969

// middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// routes
// home
app.get('/', (req, res, err) => {
    res.sendFile('index.html')
})

// getting the link
app.post('/send-link', (req, res, err) => {
    const tweetUrl = req.body.link

    // getting tweet's info
    twitter.getTweetInfo(tweetUrl, (data) => {

        // reply back
        // sending back the data
        res.send(data)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})



