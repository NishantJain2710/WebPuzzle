import mongoose from 'mongoose'

const timeSchema = mongoose.Schema({
    hour: {
        type: Number,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    sec: {
        type: Number,
        required: true
    },
})


const Timer = mongoose.model('Timer', timeSchema)
export default Timer