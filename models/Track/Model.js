const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginData',
        required: true
    },
    b: {
        type: Boolean,
        default: true
    },
    l: {
        type: Boolean,
        default: true
    },
    s: {
        type: Boolean,
        default: true
    },
    d: {
        type: Boolean,
        default: true
    },
    isFreezed: {
        type: Boolean,
        default: false
    }
})

const TrackModel = mongoose.model('Track', TrackSchema, 'Track')

module.exports = TrackModel;