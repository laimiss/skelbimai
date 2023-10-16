const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name for category"],
        trim: true,
        unique: true
    }
}
)


module.exports = mongoose.model('Category', categorySchema)