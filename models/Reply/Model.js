const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaints',
        required: true
    },
    replyeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginData',
        required: true
    },
    datetime: {
        type: Date,
        required: true,
        default: new Date(),
    },
    day: {
        type: Number,
        required: true,
        min: 0,
        max: 6,
    },
    body: {
        type: String,
        required: true,
        min: 0,
        max: 200,
        trim: true
    }
})

const ReplyModel = mongoose.model('Reply', ReplySchema, 'Reply')

module.exports = ReplyModel