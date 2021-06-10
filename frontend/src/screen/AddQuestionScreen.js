import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { QUESTION_CREATE_RESET } from '../constants/questionConstants'
import {createQuestion} from '../actions/questionActions'
import Loader from '../component/Loader'
import Message from '../component/Message'
import Header from '../component/Header.js'
const AddQuestionScreen = ({history}) => {


    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const questionCreate = useSelector((state)=> state.questionCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate} = questionCreate


    useEffect(()=>{
        if(userInfo && userInfo.isOrganizer){
            if(successCreate){
                dispatch({type: QUESTION_CREATE_RESET})
                history.push('/showQuestions')
            }
        }else{
            history.push('/Login')
        }
    },[successCreate,dispatch,history, userInfo])


    const submitHandler = (e) =>{
        e.preventDefault()

        dispatch(createQuestion({
            question: question.toUpperCase(),
            answer: answer.toUpperCase()
        }))
    }

    return (
        <div>
            <Header/>
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            <div className="questionWrapper">
                <div className="questionContainer">
                    <h1>ADD QUESTION</h1>
                    <form onSubmit={submitHandler}>
                        <div className='h4InputBinder'>
                            <h4>Question</h4>
                            <input type='text'  className='addQuestionInputBox' value={question} onChange={(e)=> setQuestion(e.target.value)}/>
                        </div>
                        <div className='h4InputBinder'>
                            <h4>Answer</h4>
                            <input type='text' className='addQuestionInputBox' value={answer} onChange={(e)=>setAnswer(e.target.value)} />
                        </div>

                        <div className='h4InputBinder'>
                            <button className='answerSubmit' type="submit">ADD QUESTION</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddQuestionScreen
