const express = require('express')
const mongoose = require('mongoose')
const CryptoJS = require('crypto-js')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const { updateMenuDate } = require('./models/MenuData/Utilities')
const { fetchMenuById, fetchMenusAll, removeMenuById } = require('./models/Menus/Utilities')
const { insertReplyForPost, getReplyForPostByID, getAllRepliesForPost, removeReplyForPost, updateReplyForPost } = require('./models/Reply/Utilities')
require('dotenv').config()
const LoginModel = require('./models/LoginData/Model').LoginModel
const MenuDataModel = require('./models/MenuData/Model').MenuDataModel
const insertUser = require('./models/LoginData/Utilities').insertUser
const removeUser = require('./models/LoginData/Utilities').removeUser
const updateUser = require('./models/LoginData/Utilities').updateUser
const fetchMenuDateData = require('./models/MenuData/Utilities').fetchMenuDateData
const url = 'mongodb://0.0.0.0:27017/messDB'

let isStartReady = true;

const app = express()

app.use(cors())



async function connectDB(urlink) {
  let status = true
  try{  
    // await mongoose.createConnection(urlink)
    await mongoose.connect(urlink)
    console.log('Connected to db ' + url)
  }
  catch(err) {
    console.log("Couldn't connect to db. Error:"+ err)
    isStartReady=false;
    status=false
  }

  return status
}

// app.all('/login', loginRoute)
// Server routes. Each routes for a service corresponding
// to a client app feature.
// app.get('/login/:username/:password/:time/:clientID', )


// app.get('/MenuData/get/menudata/:sdate/:edate', (req, res) => {
    
//   const startDate = req.params.sdate
//   const endDate = req.params.edate
//   // async function fecthMenuData(req, res) {
//   //   try{
//   //     let data = await MenuDataModel.find()
//   //     console.log('Success.')
//   //     res.json(data)
//   //   }
//   //   catch(err) {
//   //     console.log(err)
//   //     res.json({response: "Something went wrong. Couldn't fetch data."})
//   //   }
//   // }

//   try{
//       //fecthMenuData(req, res)
//       fetchMenuDateData(req, res, startDate, endDate)
//   } catch(err) {
//       console.log('fetchMenuDateData throwed an error: ' + err)
//       res.status(500).json({response: 'Something went wrong. We are sorry!'})
//   }
// })

// app.patch('/MenuData/update/menudata/:date/:menuID/:b/:l/:s/:d', (req, res) => {
//   const date = req.params.date
//   const menuID = req.params.menuID
//   const b = req.params.b
//   const l = req.params.l
//   const s = req.params.s
//   const d = req.params.d

//   try{
//       updateMenuDate(req, res, date, menuID, b, l, s, d)
//   } catch(err) {
//       console.log('updateMenuDate throwed an error: ' + err)
//       res.status(500).json({response: 'Something went wrong. We are sorry!'})
//   }
// })

// app.get('/menus/getMenu/:id', (req, res) => {
//   const oid = req.params.id
//   try{
//     fetchMenuById(req, res, oid)
//   } catch (err) {
//     // nothing needed here for now. 
//   }

// })

// app.get('/menus/getAllMenus/', (req, res) => {
//   try{
//     fetchMenusAll(req, res)
//   } catch (err) {
//     // nothing needed here for now. 
//   }

// })

// app.delete('/menus/deleteById/:id', (req, res) => {
//   const oid = req.params.id
//   try{
//     removeMenuById(req, res, oid)
//   } catch (err) {
//     // nothing needed here for now. 
//   }

// })

// app.post('/complaints/reply/:body/:datetime/:postId/:replyeeId', (req, res) => {
//   const body = req.params.body
//   const datetime = req.params.datetime
//   const postId = req.params.postId
//   const replyeeId = req.params.replyeeId

//   try{
//     insertReplyForPost(req, res, postId, body, replyeeId, datetime)
//   }
//   catch(err) {
//     // nothing to do here for now.
//   }
// })

// app.get('/complaints/getAllReplies/:postId', (req, res) => {
//   const postId = req.params.postId

//   try {
//     getAllRepliesForPost(req, res, postId)
//   } catch(err) {
//     // nothing to do here for now.
//   }

// })

// app.delete('/complaints/deleteReply/:oid', (req,res) => {
//   const oid = req.params.oid

//   try{
//     removeReplyForPost(req, res, oid)
//   } catch(err) {
//     // nothing needs to be done here for now.
//   }

// })

// app.patch('/complaints/updateReply/:oid/:body', (req, res) => {
//   const oid = req.params.oid
//   const body = req.params.body

//   try{
//     updateReplyForPost(req, res, oid, body)
//   } catch (err) {
//     // nothing needs to be done here
//   }
  
// })
// app.get('/home', (req, res) => {res.send('This is your home page')})
// // app.get('/get/TrackData/:userid?')
// // app.get('/get/Posts/')
// // app.get('/get/Post/:id/reply')
// // app.get('/get/Menu/:Date')
// // app.get('/get/MenuRating/:Date')
// // app.get('/get/TrackSemData/:userid?')
// // app.post('/post/NewPost/:userid?')
// // app.post('/post/NewReply/:postID/:userid?')
// // app.post('/post/MenuRating/:userid?')
// // app.post('/post/TrackData/:userid?')
// // app.post('/post/Post/:postID/:userID/upVote')
// // app.post('/post/Post/:postID/:userID/downVote')
// // app.post('/post/Post/:postID/:userID/unVote')
/*  Starting an secure HTTPS Server connection handler for our express app 
    and listening on sepcified port.
*/

const privateKey = fs.readFileSync(__dirname + '/httpkeys/server.key', 'utf8')
const certificate = fs.readFileSync(__dirname + '/httpkeys/server.cert', 'utf8')
const credentials = { key: privateKey, cert: certificate }

const httpsServer = https.createServer(credentials, app)
const port = process.env.PORT || 3400

if(connectDB(url) && insertUser('IMT2021095', 'Jashio@2103', 'jashwanthkadaru@gmail.com', 'jashwanth', 'kadaru', 'IMT2021095', '64a36d073fc6725c5a6819e0')){
httpsServer.listen(port, () => {
console.log('server started on port: 3400, host: local host')
})
} else {
  console.log("Could n't start the server as required conditions for starting were not properly met. See log for more details.")
}