const mongoose = require('mongoose')

const MenuDataSchema = new mongoose.Schema({
    date: {type:'Date', required:true, unique: true, default: new Date()},
    menuid: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Menus'},
    b: {type:mongoose.Schema.Types.Map, required: true, default:{}},
    l: {type:mongoose.Schema.Types.Map, required: true, default:{}},
    s: {type:mongoose.Schema.Types.Map, required: true, default:{}},
    d: {type:mongoose.Schema.Types.Map, required: true, default:{}},
    Rating: {type: [Number], required: true, default: [0,0,0,0]}
})

let MenuDataModel = mongoose.model('MenuData', MenuDataSchema, 'MenuData') 
module.exports = {MenuDataModel};