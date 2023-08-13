const { AES } = require('crypto-js')
require('dotenv').config()
const validateUser = require('./models/LoginData/Utilities').validateUser
const router = require('express').Router()
const decodeData = require('./../../Utilities/decodeData')
const jwt = require('jsonwebtoken')
const { getComplaintsFeed, insertNewComplaint } = require('../../models/Complaints/Utilities')
const { getAllRepliesForPost } = require('../../models/Reply/Utilities')
const verifyJWT = require('../../Utilities/verifyJWT')

 /**
  * 
  *     A User should be able to: 
  *         (a) make a comment: add comment.
  *         (b) read all comments: fetch all comments.
  * 
 **/

router.get('/complaints/feed/:feedNo', (req, res) => {
  const feedNo = req.params.feedNo
  try {
    let result = getComplaintsFeed(req, res, feedNo)

    if (result.status) {
      res.json({
        status: result.status,
        feed: result.feed,
        response: result.data.response,
      })
    } else {
      res.json({
        status: result.status,
        feed: [],
        response: result.data.response,
      })
    }
  } catch (err) {
    console.log('/complaints/feed route throwed an error' + err)
    res
      .sendStatus(500)
      .json({ status: result.status, feed: [], response: result.data.response })
  }
})

router.get('/complaints/complaint/:cid/replies', (req, res) => {
  const cid = req.params.cid
  try {
    let result = getAllRepliesForPost(req, res, cid)

    if (result.status) {
      res.json({
        status: result.status,
        feed: result.feed,
        response: result.data.response,
      })
    } else {
      res.json({
        status: result.status,
        feed: [],
        response: result.data.response,
      })
    }
  } catch (err) {
    console.log('/complaints/feed route throwed an error' + err)
    res
      .sendStatus(500)
      .json({ status: result.status, feed: [], response: result.data.response })
  }
})

router.post('/complaints/post-new-complaint/:uid', verifyJWT, (req, res) => {
  const uid = req.params.uid
  uid = decodeData(uid)

  if (uid !== req.uid) {
    console.log(
      '/complaints/post-new-complaint/:uid: attempt for unauthorized access to api. Forbidden.'
    )
    res.sendStatus(401).json({
      status: false,
      response: 'You are not supposed to visit this url. You are unauthorized.',
    })
  }

  try {
    let result = insertNewComplaint(
      req,
      res,
      req.body.content,
      req.body.head,
      req.body.userid,
      req.body.uname,
      req.body.datetime,
      req.body.files
    )
    if (result.status) {
      res.json({
        status: result.status,
        result: {},
        data: { response: 'server state updated successfully.' },
      })
    } else {
      res.json({
        status: result.status,
        result: {},
        data: { response: "couldn't insert data." },
      })
    }
  } catch (err) {
    console.log(
      '/complaints/post-new-complaint/:uid: route throwed an error.' + err
    )
    res.json({ status: false, result: {}, data: { response: err } })
  }
})
