const mongoose = require('mongoose')
const FeedbackSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
        
    }    
)

const Feedback = new mongoose.model('Feedback', FeedbackSchema)

module.exports = Feedback