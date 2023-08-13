const mongoose = require('mongoose')
const AdminModel = require('./Model')

async function insertAdmin(req, res, fname, lname, passw, email, root, userid )
{
    let newAdmin;

    try{
        if(userid==='null') userid=null
        newAdmin = new AdminModel({fname:fname, lname:lname, passw:passw, email:email, uname:'admin', root:root, userid:userid})
        let result = await newAdmin.save()
        console.log('insertAdmin: !!!! CAUTION !!!!\n A new admin was added successfully! isroot: ' + root)
        res.json({response: result})
    } catch(err) {
        console.log('insertAdmin: throwed an error!\n' + err)
        res.json({response: "An error occured! We're sorry!"})
    }
}

async function removeAdmin(req, res, oid )
{
    let result;
    let removedAdmin;
    try{
        removedAdmin = await AdminModel.find({_id: oid})
        if(removeAdmin[0].root) {
            console.log('removeAdmin: attempt to remove root admin from database. Forbidden action. Request Denied')
            res.json({response: 'cannot remove root itself.'})
        } 
        result = await AdminModel.deleteOne({_id: oid})
        
        if(result.acknowledged && result.deletedCount===1){
            console.log('removeAdmin: !!!! CAUTION !!!!\n Admin with _id' + oid + ' was removed from database.\n' + removeAdmin)
            res.json({response: result})
        } else if(result.acknowledged && result.deletedCount===0) {
            console.log('removeAdmin: delete request was acknowledged but no match found! Tried with admin id: ' + oid)
            res.json({response: result})
        } else if(!result.acknowledged) {
            console.log('removeAdmin: The request was not acknowledged by the server. If issue persists, pleasse check the db connection.' + oid)
            res.json({response: "Something went wrong! Try again!"})
        }
        
    } catch(err) {
        console.log('removeAdmin: throwed an error!\n' + err)
        res.json({response: "An error occured! We're sorry!"})
    }
}

async function fetchAdminById(req, res, oid){
    let admin;
    try{
        admin = await AdminModel.find({_id:oid})

        if(admin.length===0){
            console.log('fetchAdminById: No admin found with admin id: '+ oid)
            res.json({response: 'No admin found!'})
        } else if(admin.length===1){
            console.log('fetchAdminById: admin found with admin id: '+ oid)
            res.json(admin)
        }
    } catch(err) {
        console.log("fetchAdminById: throwed an error!\n" + err)
        res.json({response: "An error occurred! We're sorry."})
    }
}

async function fetchAllAdmins(req, res) {
    let result;
    try{
        result = await AdminModel.find({})

        if(result.length===0){
            console.log('fetchAllAdmins: No admins found! Seems like an error. This is in InvalidState')
            res.json({response: 'No admin found!'})
        } else if(result.length){
            console.log('fetchAllAdmins: admins found! list length:' + result.length)
            res.json(result)
        }
    } catch(err) {
        console.log("fetchAllAdmins: throwed an error!\n" + err)
        res.sendStatus(500).json({response: "An error occurred! We're sorry."})
    }
}