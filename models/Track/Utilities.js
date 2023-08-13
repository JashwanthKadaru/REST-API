const mongoose = require('mongoose')
const TrackModel = require('./Model')

async function insertTrackData(req, res, date, uid, blsd, isFreezed){
    let newObj
    try{
        newObj = new TrackModel({date:date, uid:uid, b:blsd|8, l:blsd|4, s:blsd|2, d:blsd|1, isFreezed:isFreezed })
        let result = await newObj.save()
        console.log("insertTrackData: Successfully inserted!")
        res.send(result)    
    } catch(err) {
        console.log("insertTrackData: throwed an error!\n" + err)
        res.sendStatus(500).send({response: `Something went wrong. We're sorry!`})
    }
}

async function updateTrackData(req, res, date, uid, blsd, isFreezed){
    let result
    try{
        result = await TrackModel.updateOne({date:date, uid:uid}, {b:blsd|8, l:blsd|4, s:blsd|2, d:blsd|1, isFreezed:isFreezed})
         if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===1){
            console.log('updateTrackData: Successfully updated Track doc with date: ' + date + ', uid: ' + uid)
            res.send(result)
        }else if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===0){
            console.log("updateTrackData: Match found! But couldn't modify the document.")
            res.send(result)
        }else if(result.acknowledged && result.matchedCount===0) {
            console.log('updateTrackData: No match was found for date: ' + date + ' uid: ' + uid)
            res.send(result)
        }else if(!result.acknowledged) {
            throw Error('updateTrackData: The update query was not acknowledged by the server')
        } 
    } catch(err){
        console.log('updateReplyForPost: throwed an error.\n' + err)
        res.sendStatus(500).send({response: "Something went wrong. We're sorry!"})
    }
}

async function fetchTrackData(req, res, date, uid){
    let list
    try{
        list = await TrackModel.find({date:date, uid:uid})
        if(list.length===1) {
            console.log('fetchTrackData: The document was found.')
            res.send(list)
        } else if(list.length===0) {
            console.log('fetchTrackData: no match found.')
            res.send(list)
        } else {
            throw Error(`An unseen error. This should not happen.`)
        }
    } catch(err){
        console.log('fetchTrackData: throwed an error.\n' + err)
        res.sendStatus(500).send({response: "Something went wrong. We're sorry!"})
    }
}

async function removeTrackData(req, res, date, uid){
    let result
    try{
        result = await TrackModel.deleteOne({date:date, uid:uid})
        if(result.acknowledged && result.deletedCount===1) {
            console.log('removeTrackData: The document was successfully deleted.')
            res.send(result)
        } else if(result.acknowledged && result.deletedCount===0) {
            console.log('removeTrackData: no match found or document could not be deleted.')
            res.send(result)
        } else if(!result.acknowledged) {
            throw Error(`The uery was not acknowledged by the server. This could be due to and server side error. If the error persists, please check the connection.`)
        }
    } catch(err){
        console.log('removeTrackData: throwed an error.\n' + err)
        res.sendStatus(500).send({response: "Something went wrong. We're sorry!"})
    }
}

module.exports = {insertTrackData, updateTrackData, fetchTrackData, removeTrackData}