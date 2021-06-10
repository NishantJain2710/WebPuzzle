import asyncHandler from 'express-async-handler'
import Questions from '../models/questionModel.js';
import Timer from '../models/timerModel.js';


const addQuestion = asyncHandler(async(req,res)=>{
    const {question, answer} = req.body;

    const questionExist = await Questions.findOne({question})

    if(questionExist){
        res.status(400)
        throw new Error('Question already exists')
    }else if(question === ''){
        res.status(401)
        throw new Error('Question field is Empty')
    }else if(answer === ''){
        res.status(401)
        throw new Error('Answer field is Empty')
    }

    const Question = await Questions.create({
        question,
        answer
    })

    if(Question){
        res.status(201).json({
            message: "Question is successfully added"
        })
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})

const showQuestions  = asyncHandler(async(req,res)=>{
    const questions = await Questions.find({})
    res.status(200).json({questions})
})


const deleteQuestion = asyncHandler(async(req,res)=>{
    const question = await Questions.findById(req.params.id)

    if(question){
        await question.remove()
        res.json({message: "Question Removed"})
    }else{
        res.status(404)
        throw new Error('Question Not Found')
    }
})

const editQuestion = asyncHandler(async(req,res)=>{
    const {question, answer} = req.body
    const Question = await Questions.findById(req.params.id)
    if(Question){
        Question.question = question
        Question.answer = answer

        if(Question.question === '' || Question.answer === ''){
            res.status(400)
            throw new Error('Question And Answer fields should not be Empty.')
        }else{
            const updatedQuestion = await Question.save()
            res.status(201).json(updatedQuestion)
        }
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const getQuestionById = asyncHandler(async(req,res) => {
    const question = await Questions.findById(req.params.id)

    if(question){
        res.json(question)
    }else{
        res.status(404)
        throw new Error('Question not found')
    }
})



const showQuestionsOnly  = asyncHandler(async(req,res)=>{
    const questions = await Questions.find({})
    res.status(200).json({questions})
})

const updateTime = asyncHandler(async(req,res)=>{
    const { hour, min , sec } = req.body

    const time =  await Timer.findById({_id:"60c20bd1facf65330ce18c6c"})
    
    if(time){
        time.hour = hour
        time.min = min
        time.sec = sec

        if(time.hour === '' || time.min==='' || time.sec===''){
            res.status(400)
            throw new Error('Some Field is empty')
        }else{
            const updatedTime = await time.save()
            res.status(201).json({
                hour:updatedTime.hour,
                min:updatedTime.min,
                sec:updatedTime.sec,
            })            
       }


    }
})

const showTime = asyncHandler(async(req,res)=>{
    const time =  await Timer.findById({_id:"60c20bd1facf65330ce18c6c"})
    if(time){
        res.status(200).json({
            hour: time.hour,
            min:time.min,
            sec:time.sec
        })
    }else{
        res.status(400)
        throw new Error('Time not exist')
    }
})

export{
    addQuestion,
    deleteQuestion,
    showQuestions,
    editQuestion,
    getQuestionById,
    showQuestionsOnly,
    updateTime,
    showTime
}