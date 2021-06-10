import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import {listQuestionsOnly} from '../actions/questionActions'
import Header1 from '../component/Header1'
import Question from '../component/Question'
import { showtime } from '../actions/userActions'


const QuizScreen = () => {

    const dispatch = useDispatch()

    const onlyQuestionList = useSelector(state=> state.onlyQuestionList)
    const {loading, error, question} = onlyQuestionList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const showTime = useSelector(state=> state.showTime)
    const {loading:loadingTime, error:errorTime, Time} = showTime
    

    useEffect(()=>{
        if(userInfo){
            dispatch(listQuestionsOnly())
            dispatch(showtime())
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
            {(loading && loadingTime) ? <Loader/> : (error && errorTime) ? <Message variant='Danger' >{error + errorTime}</Message> : (question.questions && Time) ? (
                <Question value={question.questions} time={Time}/>
            ): <Loader/>}
        </div>
    )
}

export default QuizScreen
