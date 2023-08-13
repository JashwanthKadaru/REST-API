const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    uname: {type:'String', required:true, trim: true, unique: true},
    passw: {type:'String', required:true, trim:false},
    email: {type:'String', required:true, trim:true},
    fname: {type:'String', required:true, trim:true},
    lname: {type:'String', required:true, trim:true},
    sid: {
        type:'String', 
        required:true, 
        trim: true},
        // validate: (value) => {
        //     // if(typeof value !== String) return false;
        //     // if(value.slice(0,3) === 'IMT' || value.slice(0,2) === 'MT' || value.slice(0,2) === 'PH' || value.slice(0,2) === 'MS')
        //     //     return true
        //     // else return false
        // }},
    addedBy: { type: mongoose.Schema.Types.ObjectId, required:true},
    lastLogin: {type:Date, default:''},
    loginStatus: {type:Boolean, default:false},
    loginDevice: {type:String, default:''},
    refreshToken: {type:String, default:''},
    replies: {type: [mongoose.Schema.Types.ObjectId], ref:'Reply'},
    upVoted: {type: [mongoose.Schema.Types.ObjectId], ref:'Posts'},
    posts: {type: [mongoose.Schema.Types.ObjectId], ref:'Posts'}
})

let LoginModel = mongoose.model('LoginData', LoginSchema, 'LoginData') 
module.exports = {LoginModel};