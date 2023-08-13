const mongoose = require('mongoose')
const ComplaintsModel = require('./Model')

async function insertNewComplaint(req, res, body, head, userid, uname, datetime, files){
    const day = (new Date(datetime)).getDay()
    let result
    try{
        const newComplaint = new ComplaintsModel({body:body, head:head, posteeId:userid, datetime:datetime, files:files, day:day })
        result = await newComplaint.save()
        return {status: true, result: result, error:''}
    } catch(err) {
        return {status:false, result:result, error:err}
    }
}

async function removeComplaintById(req, res, cid){
    let result
    try{
        result = await ComplaintsModel.deleteOne({_id:cid})
        if(result.acknowledged && result.deletedCount===0) {
            return {status:true, result:result, data:{response: 'No delete was done.'}}
        } else if(result.acknowledged && result.deletedCount===1) {
            return {status:true, result:result, data:{response: 'deleted successfully.'}}
        }
        return {status: true, result: result, error:''}
    } catch(err) {
        return {status:false, result:result, error:err}
    }
}

async function removeComplaintByDateRange(req, res, sdate, edate){
    let result
    try{
        result = await ComplaintsModel.deleteMany({datetime: {$lte:edate, $gte:sdate}})
        if(result.acknowledged && result.deletedCount===0) {
            return {status:true, result:result, data:{response: 'No delete was done.'}}
        } else if(result.acknowledged && result.deletedCount>0) {
            return {status:true, result:result, data:{response: 'deleted successfully.'}}
        }
        return {status: true, result: result, error:''}
    } catch(err) {
        return {status:false, result:result, error:err}
    }
}

async function updateComplaintBody(req, res, pid, body, datetime){
    let result
    const day = (new Date(datetime)).getDay()
    try{
        result = await ComplaintsModel.updateOne({posteeId: pid}, {$set: {body: body, datetime:datetime,  day:day}})
        if(result.acknowledged && result.matchedCount===0) {
            return {status:true, updated: false, matched: false, data:{response: 'No match was found.'}}
        } else if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===0){
            return {status:true, updated: false, matched: true, data:{response: "match found. But couldn't update"}}
        } else if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===1) {
            return {status:true, updated: true, matched: true, data:{response: 'updated successfully.'}}
        } else {
            return {status:false, updated: false, matched: false, data:{response: 'update request was not acknowledged.'}}
        }
    } catch(err) {
        return {status:false, result:result, error:err}
    }   
}

// async function updateComplaintHead(){
//     let result
//     const day = (new Date(datetime)).getDay()
//     try{
//         result = await ComplaintsModel.updateOne({posteeId: pid}, {$set: {body: body, datetime:datetime,  day:day}})
//         if(result.acknowledged && result.matchedCount===0) {
//             return {status:true, updated: false, matched: false, data:{response: 'No match was found.'}}
//         } else if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===0){
//             return {status:true, updated: false, matched: true, data:{response: "match found. But couldn't update"}}
//         } else if(result.acknowledged && result.matchedCount===1 && result.modifiedCount===1) {
//             return {status:true, updated: true, matched: true, data:{response: 'updated successfully.'}}
//         } else {
//             return {status:false, updated: false, matched: false, data:{response: 'update request was not acknowledged.'}}
//         }
//     } catch(err) {
//         return {status:false, result:result, error:err}
//     }    
// }

async function fetchComplaintById(req, res, cid){
    let list=[]
    try{
        list = await ComplaintsModel.find({_id: cid})
        if(list.length===0) {
            return {status:true, list:list, data:{response: 'No match was found.'}}
        } else if(list.length===1){
            return {status:true, list:list, data:{response: "found."}}
        } else {
            return {status:false, list:list, data:{response: 'query request was not acknowledged.'}}
        }
    } catch(err) {
        return {status:false, list:list, error:err}
    }    
}

async function fetchComplaintsByDateRange(req, res, sdate, edate){
    let list=[]
    try{
        list = await ComplaintsModel.find({datetime: {$lte:edate, $gte:sdate}})
        if(list.length===0) {
            return {status:true, list:list, data:{response: 'No match was found.'}}
        } else if(list.length>0){
            return {status:true, list:list, data:{response: "found."}}
        } else {
            return {status:false, list:list, data:{response: 'query request was not acknowledged.'}}
        }
    } catch(err) {
        return {status:false, list:list, error:err}
    }        
}

async function fetchComplaintsByName(req, res, name, posteeid){
    let list=[]
    try{
        list = await ComplaintsModel.find({posteeId: posteeid})
        if(list.length===0) {
            return {status:true, list:list, data:{response: 'No match was found.'}}
        } else if(list.length>0){
            return {status:true, list:list, data:{response: "found."}}
        } else {
            return {status:false, list:list, data:{response: 'query request was not acknowledged.'}}
        }
    } catch(err) {
        return {status:false, list:list, error:err}
    }    
}

async function getComplaintsFeed(req, res, feedNo){
    let status = false
    let feed = []
    try{
        feed = await ComplaintsModel.find({}).sort({datetime: -1}).skip(feedNo*20).limit(20)
        if(feed.length===0){
            console.log('No feed available')
            return {status: true, feed: [], data: {response: "No feed, as yet!"}}
        } else {
            console.log('feed size: ' + feed.length + ' Complaints.')
            return {status: true, feed: feed, data: {response: `feed size: ${feed.length} Complaints.`}}
        }
    } catch(err) {
        console.log("getComplaintsFeed: throwed an error!\n" + err)
        return {status: false, feed: [], data: {response: err} }
    }
}

module.exports = {insertNewComplaint, removeComplaintByDateRange, removeComplaintById, updateComplaintBody, /*updateComplaintHead, fetchComplaintsByHead,*/ fetchComplaintById, fetchComplaintsByDateRange, fetchComplaintsByName, getComplaintsFeed}