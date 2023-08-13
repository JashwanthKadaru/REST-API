const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  fname: {type: String, required: true, trim:true},
  lname: {type: String, required: true, trim:true},
  email: {type: String, required: true, trim:true},
  uname: {type: String, enum:['admin'], required: true, trim:true, default: 'admin'},
  passw: {type: String, required: true, trim:true},
  root: {type: Boolean, required:true, default:false},
  userid: {type: mongoose.Schema.Types.ObjectId, ref:'LoginData', required:false},
  lastLogin: {type: mongoose.Schema.Types.Date, default:null},
  loginStatus: {type: Boolean, default:false},
  lastDevice: {type: String, default:""},
  refreshToken: {type: String, default:""}
})

const AdminModel = mongoose.model('AdminData', AdminSchema, 'AdminData')
module.exports = AdminModel