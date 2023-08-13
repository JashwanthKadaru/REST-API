const { AES } = require('crypto-js')
// const mongoClient = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

function decodeData( encryptedData ) {
    encryptedDataUtf = Buffer.from(encryptedData, 'hex').toString('utf8')
    console.log(encryptedDataUtf)
    decryptedData = CryptoJS.AES.decrypt(encryptedDataUtf, process.env.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8)
    return decryptedData;
}

module.exports = decodeData