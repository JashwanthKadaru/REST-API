const { AES } = require('crypto-js')
require('dotenv').config()
const router = require('express').Router()
const decodeData = require('./../../Utilities/decodeData')
const verifyJWT = require('./../../Utilities/verifyJWT')
const { fetchMenuById } = require('../../models/Menus/Utilities')
const { fetchMenuDateData } = require('./../../models/MenuData/Utilities')

 /**
  * 
  *     A User should be able to: 
  *         (a) reply to a comment: add a reply to comment,
  *         (b) read replies for a comment: get replies to comment.
  * 
 **/

router.get('/Menu/byDate/:date', (req, res) => {
    const date = new Date(req.params.date)

    try{
        let result = fetchMenuDateData(req, res, date, date)
        if(result.status) {
            let data = {}
            data.status = result.status
            data.menuList = result.menuList
            data.response = result.data.response
            res.json(data)
        } else {
            if(!result.error){
                let data = {}
                data.status = result.status
                data.menuList = result.menuList
                data.response = result.data.response
                res.json(data)
            } else{
                throw Error(result.data.response)
            }
        }
    } catch(err) {
        res.sendStatus(500).json({status:false, response:err})
    }
})

router.get('Menus/:menuid', (req,res) => {
    const menuid = req.params.menuid

    try{
        let result = fetchMenuById(req, res, menuid)
        if(result.status) {
            let data = {}
            data.status = result.status
            data.menu = result.menu[0]
            data.response = result.data.response
            res.json(data)
        } else {
            if(!result.error){
                let data = {}
                data.status = result.status
                data.menu = {}
                data.response = result.data.response
                res.json(data)
            } else{
                throw Error(result.data.response)
            }
        }
    } catch(err) {
        res.sendStatus(500).json({status:false, response:err})
    }
})