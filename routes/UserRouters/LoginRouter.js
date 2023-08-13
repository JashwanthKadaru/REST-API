const { AES } = require('crypto-js')
require('dotenv').config()
const validateUser = require('./models/LoginData/Utilities').validateUser
const router = require('express').Router()
const decodeData = require('./../../Utilities/decodeData')
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    // res.send('This is login page repsonse from server.')

})

// router.delete('/removeuser/:adminId/:uid', (req, res) => {
//     let uid = req.params.uid
//     let adminId = req.params.adminId
//     removeUser(req, res, uid)
// })

router.get('/:username/:loginTime/:password', (req, res) => {
  try{
    uname = req.params.username
    passw = req.params.password
    loginTime = req.params.loginTime
  
    let data = {}

    unameDecrypted = decodeData(uname)
    passwDecrypted = decodeData(passw)
    loginTimeDecrypted = decodeData(loginTime)
    
    let ret = validateUser(req, res, unameDecrypted, passwDecrypted)
    
    if(ret===null) throw Error('Validate user throwed an error.')
    else if(ret[0]) {
      const accessToken = jwt.sign(ret[1].uid, process.env.JWT_ACCESS_TOKEN_SECRET , {expiresIn: '1h'})
      const refreshToken = jwt.sign(ret[1].uid, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '3h'})
      req.json({accessToken: accessToken, refreshToken: refreshToken})
    } else if(!ret[0]) {
      res.sendStatus(401) // invalid login
    }
  }
    catch (err) {
    console.log('Something went wrong here.\n' + err)
    res.sendStatus(500).send('Something went wrong' + err + '\n' + uname + '\n' + passw +'\n' + loginTime)
  }
})


module.exports = router