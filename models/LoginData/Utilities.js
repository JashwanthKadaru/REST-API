const mongoose = require('mongoose')
const LoginModel = require('./Model').LoginModel

async function insertUser(uname, passw, email, fname, lname, sid, addedBy) {
  try{
    const user = new LoginModel({uname: uname, passw:passw, email:email, fname:fname, lname:lname,sid:sid, addedBy:addedBy})
    await user.save()
    console.log('Inserted succesfully')
    return true
  }
  catch(err)
  {
    console.log('Insertion falied: \n' + err)
    return false
  }
}

async function insertManyUsers(users) {
    let connections = 0;
    try{
        if(!(users && users.length && users.length!=0)) return;

        for(let i=0; i<users.length; i++)
        {
            let status = await insertUser(users[i].uname, users[i].passw, users[i].email, users[i].fname, users[i].lname, users[i].sid, users[i].addedBy)
            if(status) connections++;
        }

        return connections;
    }
    catch(err) 
    {
        console.log(`Something went wrong: \n Total inserted: ${connections}` + err)
        return connections;
    }
}

async function validateUser(req, res, unameDecrypted, passwDecrypted) {
    let users = undefined;
    let vstatus = false; 
    try{
        users = await LoginModel.find({uname: unameDecrypted})
        // console.log(typeof users)
        // console.log(users[0].passw)
        // console.log({...users})
        let data = {}
        let authenticated = false
        if(!users || (users && users!== undefined && users.length===0) || users.length!==1) 
        {
            console.log('No users with username.')
            authenticated = false
        }
        else if ( users[0].passw !== undefined && users[0].passw === passwDecrypted) {
            console.log('Found user. Authenticated.')
            vstatus = true
            console.log('users: '+users)

            data.uid = users[0]._id
            authenticated = true
        }
        else
        {
            console.log('Wrong password')
            // data.response = 'Wrong password'
            authenticated = false
        } 
        return [authenticated, data]
        
    } catch(err) {
        // console.log(err)
        // res.sendStatus(500).send('An error ocurred. We are sorry!')
        return null
    } 
}

async function removeUser(req, res, uid) {
    let result = undefined;
    let rstatus = false; 
    try{
        result= await LoginModel.deleteOne({_id: uid})
        rstatus=true
        console.log(result)
        res.json({response: result})
    } catch(err) {
        rstatus=false
        console.log(err)
        res.sendStatus(500).json({response: err}) 
        // console.log(err)
        // res.status(500).send('An error ocurred. We are sorry!')
    }
}

async function updateUser(req, res, uid, password) {
    let result = undefined;
    let ustatus = false; 
    try{
        result= await LoginModel.updateOne({_id: uid}, {$set: {passw: password}})
        ustatus=true
        console.log(result)
        // res.json({response: result})
        return true
    } catch(err) {
        ustatus=false
        console.log(err)
        return false
        //res.sendStatus(500).json({response: err}) 
        // console.log(err)
        // res.status(500).send('An error ocurred. We are sorry!')
    }
}

async function updateRefreshToken(req, res, userid, refreshToken) {
    let result = undefined;
    let ustatus = false; 
    try{
        result= await LoginModel.updateOne({_id: uid}, {$set: {refreshToken: refreshToken}})
        ustatus=true
        console.log(result)
        // res.json({response: result})
        return true
    } catch(err) {
        ustatus=false
        console.log(err)
        return false
        //res.sendStatus(500).json({response: err}) 
        // console.log(err)
        // res.status(500).send('An error ocurred. We are sorry!')
    }
}

async function getNameById(req, res, uid) {
    let result = undefined;
    let ustatus = false; 
    try{
        result= await LoginModel.find({_id: uid})
        ustatus=true
        console.log(result)
        // res.json({response: result})
        return {status:ustatus,uname: result[0].uname}
    } catch(err) {
        ustatus=false
        console.log(err)
        return {status:ustatus,uname: result[0].uname}
        //res.sendStatus(500).json({response: err}) 
        // console.log(err)
        // res.status(500).send('An error ocurred. We are sorry!')
    } 
}
module.exports = {validateUser,insertUser, insertManyUsers, removeUser, updateUser, getNameById}