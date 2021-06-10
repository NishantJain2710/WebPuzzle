import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'


const registerUser = asyncHandler(async(req,res)=>{
    const {name, enrollmentNo, phoneNumber, password, cPassword} = req.body;
    const userExist = await User.findOne({enrollmentNo})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }else if(name=== ''){
        res.status(401)
        throw new Error('Enter Name')
    }else if(enrollmentNo===''){
        res.status(401)
        throw new Error('Enter Enrollment Number')
    }else if(phoneNumber===''){
        res.status(401)
        throw new Error('Enter Password')
    }else if(password===''){
        res.status(401)
        throw new Error('Enter Password')
    }else if(password !== cPassword){
        res.status(401)
        throw new Error('Password do not Match!!')
    }

    const user = await User.create({
        name,
        enrollmentNo,
        phoneNumber,
        password
    })
    if(user){
        res.status(201).json({
            message: "Registration Done Successfully"
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


const loginUser = asyncHandler(async(req,res)=>{
    const {enrollmentNo, password} = req.body;
    const user = await User.findOne({enrollmentNo})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            enrollmentNo: user.enrollmentNo,
            phoneNumber: user.phoneNumber,
            isOrganizer: user.isOrganizer,
            isAttempted: user.isAttempted,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const showParticipants  = asyncHandler(async(req,res)=>{
    const participants = await User.find({isOrganizer : false}).select("-password")
    res.status(200).json({participants})
})


const deleteParticipant = asyncHandler(async(req,res)=>{    
    const participant = await User.findById(req.params.id)
    if(participant){
        await participant.remove()
        res.json({message: "Participant Removed"})
    }else{
        res.status(404)
        throw new Error('Participant Not Found')
    }
})

const checkForAttempt = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user && !user.isAttempted){
        user.isAttempted = true 
        const updatedUser = await user.save()
        res.json({
            _id:updatedUser._id,
            isOrganizer: updatedUser.isOrganizer,
            isAttempted:updatedUser.isAttempted,
            name: updatedUser.name,
            enrollmentNo: updatedUser.enrollmentNo,
            phoneNumber: updatedUser.phoneNumber,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})


export{
    registerUser,
    loginUser,
    showParticipants,
    deleteParticipant,
    checkForAttempt
}