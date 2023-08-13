const CryptoJS = require('crypto-js')
require('dotenv').config()
let uname = 'IMT2021095'
let passw = 'Jashio@2103'
let loginTime = (new Date()).toISOString();

// console.log(process.env.ENCRYPT_KEY)
let unameE = CryptoJS.AES.encrypt(uname, process.env.ENCRYPT_KEY).toString()
let unameEhex = Buffer.from(unameE, 'utf8').toString('hex')

let passwE = CryptoJS.AES.encrypt(passw, process.env.ENCRYPT_KEY).toString()
let passwEhex = Buffer.from(passwE, 'utf8').toString('hex')

let ltE = CryptoJS.AES.encrypt(loginTime, process.env.ENCRYPT_KEY).toString()
let ltEhex = Buffer.from(ltE, 'utf8').toString('hex')

// unameUtf = Buffer.from(unameEhex, 'hex').toString('utf8')
// unameDecrypted = CryptoJS.AES.decrypt(unameUtf, process.env.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8)

console.log(unameEhex + '\n' + passwEhex + '\n' + loginTime + '\n' + ltEhex)