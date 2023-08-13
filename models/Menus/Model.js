const mongoose = require('mongoose')

let MenuSchema = new mongoose.Schema({
    b: {type: mongoose.Schema.Types.Map, required: true, default: {}},
    l: {type: mongoose.Schema.Types.Map, required: true, default: {}},
    s: {type: mongoose.Schema.Types.Map, required: true, default: {}},
    d: {type: mongoose.Schema.Types.Map, required: true, default: {}}
})

let MenuModel = mongoose.model('Menus', MenuSchema, 'Menus')

module.exports = MenuModel; 