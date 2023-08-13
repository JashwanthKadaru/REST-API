const { AES } = require('crypto-js')
require('dotenv').config()
const router = require('express').Router()
const decodeData = require('./../../Utilities/decodeData')
const verifyJWT = require('./../../Utilities/verifyJWT')
const { getAllRepliesForPost, insertReplyForPost } = require('./../../models/Reply/Utilities')

 /**
  * 
  *     A User should be able to: 
  *         (a) reply to a comment: add a reply to comment,
  *         (b) read replies for a comment: get replies to comment.
  * 
 **/


// handles : get all the replies for a given comment.
router.get('/replies/:cid', (req, res) => {
    const cid = req.params.cid
    try{
        let result = getAllRepliesForPost(req, res, cid)
        if(result.status){
            let repliesList = result.feed
            res.json(result)
        } else {
            throw Error(result.data.response)
        }
    } catch(err) {
        console.log('/replies/:cid throwed an error: ' + err)
        res.sendStatus(401).json({status:false, feed:[], data:{response: "An error ocuured.We're Sorry!"}})
    }
})

// handles : add a new reply to a comment
router.get('/replies/newreply/:cid', (req, res) => {
    const cid = req.params.cid
    try{
        let result = insertReplyForPost(req, res, cid, req.body.replyContent, req.body.replieeId, req.body.timestamp)
        if(result.status){
            res.sendStatus(200).json({status:true, result:result, data: {response: 'Reply was added succesfully to the tree.'}})
        } else {
            throw Error(result.data.response)
        }
    } catch(err) {
        console.log('/replies/:cid throwed an error: ' + err)
        res.sendStatus(401).json({status:false, result:result, data:{response: "An error ocuured.We're Sorry!"}})
    }
})
