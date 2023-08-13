const { AES } = require('crypto-js')
require('dotenv').config()
const router = require('express').Router()
const decodeData = require('./../../Utilities/decodeData')
const verifyJWT = require('./../../Utilities/verifyJWT')
const updateUser = require('./../../models/LoginData/Utilities').updateUser
const jwt = require('jsonwebtoken');


router.patch('/:uid/updatePassword', verifyJWT, (req, res) => {
    let uid = req.params.uid
    let password = req.body.newpassword

    uidDecrypted = decodeData(uid)
    passwDecrypted = decodeData(password)
    
    if(updateUser(req, res, uid, password)) {
        response = {}
        response.status=true
        response.message='Password updated successfully!'
        res.json(response)
    } 
    else {
        console.log(err)
        res.sendStatus(500).json({response: err}) 
    }
})

