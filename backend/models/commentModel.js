const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    ad: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Ad'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: [true, "Please add a description"],
        trim: true
    }

},
    { timestamps: true }
)


module.exports = mongoose.model('comment', commentSchema)