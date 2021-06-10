import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listQuestionDetails, updateQuestion } from '../actions/questionActions'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { QUESTION_UPDATE_RESET } from '../constants/questionConstants'
import Header from '../component/Header.js'

const EditQuestionScreen = ({match,history}) => {

    const questionId = match.params.id

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const dispatch = useDispatch()

    const questionDetails = useSelector(state => state.questionDetails)
    const{loading, error, question:questionDetail} = questionDetails 

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const questionUpdate = useSelector((state) => state.questionUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = questionUpdate

    useEffect(()=>{
        if(userInfo && userInfo.isOrganizer){
            if(successUpdate){
                dispatch({type: QUESTION_UPDATE_RESET})
                history.push('/showQuestions')
            }else{
                if(!questionDetail || questionDetail._id !== questionId){
                    dispatch(listQuestionDetails(questionId))
                }else{
                    setQuestion(questionDetail.question)
                    setAnswer(questionDetail.answer)
                }
            }
        }else{
            history.push('/Login')
        }
    },[userInfo, history, dispatch, successUpdate, questionId, questionDetail])


    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateQuestion({
            _id:questionId,
            question: question.toUpperCase(),
            answer: answer.toUpperCase()
        }))
    }

    return (
        <div>
            <Header/>
            {loading && <Loader/>}
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='Danger'>{errorUpdate}</Message>}
            {successUpdate && <Message variant='Success'>Question Successfully Updated</Message>}
            <div className="questionWrapper">
                <div className="questionContainer">
                    <h1>EDIT QUESTION</h1>
                    {
                        error? <Message variant='danger'>{error}</Message>: (
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
                                    <button className='answerSubmit' type="submit">EDIT QUESTION</button>
                                </div>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EditQuestionScreen
