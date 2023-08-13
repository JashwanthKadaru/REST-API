const mongoose = require('mongoose')

const ComplaintsSchema = new mongoose.Schema({
    posteeId: {type: mongoose.Schema.Types.ObjectId, ref:'LoginData', required: true},
    datetime: {
        type: Date, required: true,
        default: new ISODate()
    },
    day: {
        type: Date,
        required: true,
    },
    head: {
        type: String,
        max: 25,
        min: 0,
        required:true,
        trim: true
    },
    body: {
        type: String,
        max: 400,
        min: 0,
        required:true,
        trim: true
    },
    files: {
        type: [{type:String, trim: true}],
        required: true,
        validate: [
            {
                validator: function(replies) {
                    return replies.length >= 0
                },
                message: 'The field should have atleast 0 file paths.'
            },
            {
                validator: function(replies) {
                    return replies.length <= 4
                },
                message: 'The field can have atmost 4 file paths.'
            }
        ]
    },
    replies: {
        type: [ {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Reply' 
        }],
        required: false,
        validate: [
            {
                validator: function(replies) {
                    return replies.length >= 0
                },
                message: 'The field should have atleast 0 replies.'
            }
        ]
    },
    upVotes: {
        type: Number,
        default: 0,
        required: true
    }
})

const ComplaintsModel = mongoose.model('Complaints', ComplaintsSchema, 'Complaints')

module.exports = ComplaintsModel