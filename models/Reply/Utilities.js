const mongoose = require('mongoose')
const ReplyModel = require('./Model')

async function insertReplyForPost(req, res, postId, content, replyeeId, datetime){
    let newReply;
    const date = (new Date(datetime))
    const day = date.getDay()
    try {
        newReply = new ReplyModel({postId:postId, replyeeId:replyeeId, body:content, datetime:datetime, day: day})
        
        let result = await newReply.save()

        console.log('insertReplyForPost: Successfully inserted!')
        return {status:true, result: result}
        // res.send(result)
    } catch(err) {
        console.log('insertReplyForPost: throwed an error.\n' + err)
        // res.sendStatus(500).send({response: "Something went wrong. We're Sorry!"})

    }
}

async function removeReplyForPost(req, res, oid){
    let result;
    try{
        result = await ReplyModel.deleteOne({_id: oid})

        if(result.acknowledged && result.deletedCount===1) {
            console.log('removeReplyForPost: reply with reply id: ' + oid + ' was successfully deleted.')
            // res.send(result)
            return {status: true, result:result, data:{response: 'reply with reply id: ' + oid + ' was successfully deleted.'}}
        }
        else if(result.acknowledged && result.deletedCount===0) {
            console.log('removeReplyForPost: Failed to delete reply with reply id: ' + oid + '. The query was acknowledged successfully!')
            // res.send(result)
            return {status: true, result:result, data:{response: 'reply with reply id: ' + oid + ' was successfully deleted.'}}
        }
        else if(!result.acknowledged) {
            throw Error('removeReplyForPost: The delete query was not acknowledged!')
        }
    } catch (err) {
        console.log('removeReplyForPost: Throwed an error!\n' + err)
        // res.sendStatus(500).send({response: "Something went wrong. We're sorry!"})
        return {status: false, result:result, data:{response: "Something went wrong. We're sorry!"}}
    }
}

async function updateReplyForPost(req, res, oid, content) {
    let result;
    
    try{
        result = await ReplyModel.updateOne({_id: oid}, {body: content})
        if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===1){
            console.log('updateReplyForPost: Successfully updated reply with reply ID: ' + oid)
            res.send(result)
        }else if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===0){
            console.log("updateReplyForPost: Match found! But couldn't modify the document's body attribute.")
            res.send(result)
        }else if(result.acknowledged && result.matchedCount===0) {
            console.log('updateReplyForPost: No match was found for reply id: ' + oid)
            res.send(result)
        }else if(!result.acknowledged) {
            throw Error('updateReplyForPost: the update query was not acknowledged by the server')
        } 

    } catch(err) {
        console.log('updateReplyForPost: throwed an error.' + err)
        res.sendStatus(500).send({response: "Something went wrong. We're sorry!"})
    }
}

async function getReplyForPostByID(req, res, postID, replyeeId){
    let reply;
    let response;
    try {
        reply = await ReplyModel.find({postId:postID, replyeeId: replyeeId})
        if(reply.length===0){
            console.log('getReplyForPostByID: No reply was found with the given replyee ID: '+ replyeeId)
            response = 'No reply was found with the given replyee ID: '+ replyeeId
        } else if(reply.length===1) {
            console.log('getReplyForPostByID: Reply with replyee ID:' + replyeeId + 'was found!')
            response = 'Reply with replyee ID:' + replyeeId + 'was found!'
        } else {
            throw Error('getReplyForPostByID: Find returned an array of len > 1. This should not happen.')
        }

        // await res.send(reply)
        return {status: true, reply:reply, data: {response: ''}}
    } catch(err) {
        console.log('getReplyForPostByID: throwed an error.\n' + err)
        // await res.sendStatus(500).send({response:"Something went wrong. We're sorry!"})
        return {response:"Something went wrong. We're sorry!"}
    }
}

async function getAllRepliesForPost(req, res, postID){
    let reply;
    try {
        reply = await ReplyModel.find({postId:postID}, {postId, replyeeId, datetime, day, body})
        if(reply.length===0){
            console.log('getAllRepliesForPost: No reply was found for the given post ID: '+ postID)
            return {status:true, feed:[], data:{response: 'No replies, as yet for the post.'}}
        } else if(reply.length>0) {
            console.log('getAllRepliesForPost: Reply list obtained for post ID:' + postID + '!')
            return {status:true, feed:reply, data:{response: 'reply list obtained for post. Post has replies.'}}
        } else {
            throw Error('getAllRepliesForPost: This should not happen.')
        }
        // await res.send(reply)
    } catch(err) {
        console.log('getAllRepliesForPost: throwed an error.\n' + err)
        return {status:false, feed:[], data:{response: "An error ocuured.We're Sorry!"}}
        // await res.sendStatus(500).send({response:"Something went wrong. We're sorry!"})
    }   
}

module.exports = {insertReplyForPost, removeReplyForPost, updateReplyForPost, getAllRepliesForPost, getReplyForPostByID};