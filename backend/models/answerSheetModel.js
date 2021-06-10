import mongoose from 'mongoose'

const answerSheetSchema = mongoose.Schema({
    question:{type:String, required:true},
    answer:{type:String, required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})


const AnswerSheet = mongoose.model('AnswerSheet', answerSheetSchema)
export default AnswerSheet