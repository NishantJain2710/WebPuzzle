import React,{useEffect} from 'react'
import {Link}  from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {listQuestions, deleteQuestion} from '../actions/questionActions'
import Header from '../component/Header.js'


const ShowQuestionsScreen = ({history}) => {
    const dispatch = useDispatch()

    const questionList = useSelector((state)=> state.questionList)
    const {loading, error, questions: allQuestions} = questionList

    const userLogin = useSelector((state)=> state.userLogin)
    const{userInfo} = userLogin

    useEffect(()=>{
        if(userInfo && userInfo.isOrganizer){
            dispatch(listQuestions())
        }else{
            history.push('/Login')
        }
    },[dispatch, history, userInfo])
    

    const deleteHandler = (id) => {
        if(window.confirm('Are you Sure')){
            dispatch(deleteQuestion(id))
            window.location.reload()
        }
    }


    return (
        <div>
            <Header/>
            {loading ? <Loader/> : error ? <Message variant="Danger">{error}</Message> : (
            <div className='showQuestion'>
                <h1>ALL QUESTIONS</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>SNO:</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allQuestions.questions ? 
                            (
                                allQuestions.questions.map((question,index)=>(
                                    <tr key={question._id}>
                                        <td>{index + 1}</td>
                                        <td>{question.question}</td>
                                        <td>{question.answer}</td>
                                        <td> <Link to={`/editQuestions/${question._id}`}>EDIT</Link> </td>
                                        <td onClick={()=> deleteHandler(question._id)}>DELETE</td>
                                    </tr>
                                ))
                            )
                            : (<div></div>)
                        }
                    </tbody>
                </table>
            </div> 
            )} 
        </div>
    )
}

export default ShowQuestionsScreen
