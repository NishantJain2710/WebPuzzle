import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import {listQuestionsOnly} from '../actions/questionActions'
import Question from '../component/Questions'
import Header1 from '../component/Header1'


const QuizScreen = () => {

    const dispatch = useDispatch()

    const onlyQuestionList = useSelector(state=> state.onlyQuestionList)
    const {loading, error, question} = onlyQuestionList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(()=>{
        if(userInfo){
            dispatch(listQuestionsOnly())
        }
    },[userInfo, dispatch])

   const disableFunction = (e) => {
        e.preventDefault()  
        return false
   }

    return (
        <div  
        onCopy = {disableFunction}
        onPaste = {disableFunction}
        onCut = {disableFunction}
        >
            <Header1/>
            {loading ? <Loader/> : error ? <Message variant='Danger' >{error}</Message> : question.questions ? (
                <Question value= {question.questions}/>
            ): (<Loader/>)}
        </div>
    )
}

export default QuizScreen
