import mongoose from 'mongoose'

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
})


const Questions = mongoose.model('Questions', questionSchema)
export default Questions