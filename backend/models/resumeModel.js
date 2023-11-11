const mongoose = require('mongoose')

const resumeSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value.']
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Resume', resumeSchema)