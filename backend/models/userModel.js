import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    enrollmentNo: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isOrganizer:{
        type:Boolean,
        require:true,
        default:false
    },
    isAttempted:{
        type:Boolean,
        require:true,
        default:false
    }
},{
    timestamps:true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


const User = mongoose.model('User', userSchema)
export default User