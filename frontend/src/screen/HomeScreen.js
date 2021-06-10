import React,{useEffect} from 'react'
import {useSelector,useDispatch } from 'react-redux'
import {iIncrementMethod} from '../actions/constantActions.js'
import Header from '../component/Header.js'
// import {requestAttempt} from '../actions/userActions'


const HomeScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state)=> state.userLogin)
    const{userInfo} = userLogin


    useEffect(()=>{
        if(userInfo){
            history.push('/')
        }else{
            history.push('/Login')
        }
    },[userInfo,history,dispatch])

    const quizWindow = (e) =>{
        e.preventDefault();
        // dispatch(requestAttempt(userInfo._id))
        dispatch(iIncrementMethod(1))
       window.open(
           "http://localhost:3000/Quiz",
           "Quiz",
           "resizable,noopener"    
       )
    }
    return (
        <div>
            <Header/>
            <div className='quizItemsWrapper'>
                <h1>Instructions</h1>
                <ul className="instructions">
                    <li>The game includes approximately 15 questions</li>
                    <li>Each question should be solved within 2 minutes maximum.</li>
                    <li>If an individual is not able to solve a question in 2 minutes, then he/she will be disqualified.</li>
                    <li>Next question will appear only if an individual is able to solve the previous question in the given time limit.</li>
                    <li>The judgement will be given on the basis of number of correct questions and total time taken by an individual.</li>
                </ul>
                {userInfo &&(
                     !userInfo.isAttempted ? ( <button onClick={quizWindow}>Start Quiz</button>) : 
                    <div>
                        <button disabled>Start Quiz</button>
                        <p>Attempt Finish !!</p>
                    </div>
                    
                )}
            </div>
            
        </div>
    )
}

export default HomeScreen