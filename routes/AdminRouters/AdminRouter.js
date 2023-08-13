const { AES } = require('crypto-js')
const mongoClient = require('mongoose')
require('dotenv')
const validateUser = require('./models/LoginData/Utilities').validateUser
const router = require('express').Router()
// const jwt = require('jsonwebtoken')


// router will be mounted on /admin

router.get('/', (req, res) => {
    // res.send('This is admin page repsonse from server.')
})

router.delete('/removeuser/:adminId/:uid', (req, res) => {
    let uid = req.params.uid
    let adminId = req.params.adminId
    removeUser(req, res, uid)
})