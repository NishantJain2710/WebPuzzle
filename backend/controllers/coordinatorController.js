import asyncHandler from 'express-async-handler'
import Questions from '../models/questionModel.js';


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


export{
    addQuestion,
    deleteQuestion,
    showQuestions,
    editQuestion,
    getQuestionById,
    showQuestionsOnly,
}