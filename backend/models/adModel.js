const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, "Please add a Category"],
        ref: 'Category'
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please set a price in Euros"],
        trim: true
    }
},
    { timestamps: true }
)


module.exports = mongoose.model('Ad', adSchema)