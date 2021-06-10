import mongoose from 'mongoose'

const resultSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    correctQuestions:{
        type: String,
        require: true,
        default:0
    },
    timeTaken:{
        type: String,
        require: true,
        default: 300
    }
},{
    timestamps:true
})

const Result = mongoose.model('Result',resultSchema)
export default Result