const express = require('express')
const mongoClient = require('mongoose')
const BCrypt = require('bcrypt')
const { AES } = require('crypto-js')
const dotenv = require('dotenv')
const cors = require('cors')
const https = require('https')
const fs = require('fs')

const app = express()

app.use(cors())

// Server routes. Each routes for a service corresponding
// to a client app feature.
app.get('/login/:username/:password/:time/:clientID', )

app.get('/get/TrackData/:userid?')
app.get('/get/Posts/')
app.get('/get/Post/:id/reply')
app.get('/get/Menu/:Date')
app.get('/get/MenuRating/:Date')
app.get('/get/TrackSemData/:userid?')
app.post('/post/NewPost/:userid?')
app.post('/post/NewReply/:postID/:userid?')
app.post('/post/MenuRating/:userid?')
app.post('/post/TrackData/:userid?')
app.post('/post/Post/:postID/:userID/upVote')
app.post('/post/Post/:postID/:userID/downVote')
app.post('/post/Post/:postID/:userID/unVote')
/*  Starting an secure HTTPS Server connection handler for our express app 
    and listening on sepcified port.
*/
const privateKey = fs.readFileSync(__dirname + '/httpkeys/server.key', 'utf8')
const certificate = fs.readFileSync(__dirname + '/httpkeys/server.cert', 'utf8')
const credentials = { key: privateKey, cert: certificate }

const httpsServer = https.createServer(credentials, app)
const port = process.env.PORT || 3400

httpsServer.listen(port, () => {
  console.log('server started on port: 3400, host: local host')
})
