const { AES } = require('crypto-js')
const bodyparser = require('body-parser')
require('dotenv').config()
const jwt = require('jsonwebtoken');

async function verifyJWT(req, res, next){
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET , (err, uid) => 
        {
            if (err) {
                return res.sendStatus(403); // Token is invalid
            }

            req.uid = uid;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

module.exports = verifyJWT