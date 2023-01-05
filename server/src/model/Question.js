const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema(
    {

        question: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }
        ,replies:[
            {
                email:{
                    type:String,
                    default:"mernstack@gmail.com"
                },
                msg:String,

            }
        ]
    },
    {
        timestamps:true
    }
)

const Question = new mongoose.model('Question', QuestionSchema)

module.exports = Question