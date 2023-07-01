const { AES } = require('crypto-js')
const mongoClient = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv')
const router = require('express').Router()

router.use(bodyparser.json())

router.get('./uname/:username/:loginTime/:password', (req, res) => {
    uname = req.params.username
    passw = req.params.password
    loginTime = req.params.loginTime

    uname = AES.decrypt(uname, process.env.DECRYPT_KEY)
    passw = AES.decrypt(passw, process.env.DECRYPT_KEY)
    loginTime = AES.decrypt(loginTime, process.env.DECRYPT_KEY)
})