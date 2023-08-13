const mongoose = require('mongoose')

const TrackSemSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginData',
        required: true
    },
    semStart: {
        type: Date,
        required: true
    },
    semEnd: {
        type: Date,
        required: true
    },
    sem: {
        type:Number,
        required: true,
    },
    bTaken: {
        type:Number,
        required: true,
    },
    lTaken: {
        type:Number,
        required: true,
    },
    sTaken: {
        type:Number,
        required: true,
    },
    dTaken: {
        type:Number,
        required: true,
    }
})

const TrackSemModel = mongoose.model('TrackSem', TrackSemSchema, 'TrackSem')

module.exports = TrackSemModel