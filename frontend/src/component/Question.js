import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {iUpdateMethod} from '../actions/constantActions'
import {answerSheet} from '../actions/userActions'
import {useSelector} from 'react-redux'


const Question = ({value,time}) => {

    const dispatch = useDispatch()

    const [ans , setAns] = useState('')
    const [question, setQuestion] = useState('')
    const [hour, setHour] = useState('')
    const [min, setMin] = useState('')
    const [sec, setSec] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    var i = localStorage.getItem('i')

    useEffect(()=>{
        if(value){
            setQuestion(value[i-1].question)
        }
        setInterval(timer,1000)
    },[i,value,setQuestion])

    const next = (e) => {
        e.preventDefault()
        dispatch(answerSheet(question, ans, userInfo._id))
        i++
        dispatch(iUpdateMethod(i))
        setQuestion(value[i-1].question)
        setAns('')
    }
    const prev = (e) => {
        e.preventDefault()
        dispatch(answerSheet(question, ans, userInfo._id))
        i--
        dispatch(iUpdateMethod(i))
        setQuestion(value[i-1].question)
        setAns('')
    }
    const finish = (e) =>{
        e.preventDefault()
        dispatch(answerSheet(question, ans, userInfo._id))
        if(window.confirm('Are you Sure')){
            setInterval(window.close(),2000)
            setAns('')
        }
    }

    const timer = () =>{
        const date = new Date()
        const CurrentHour = date.getHours()
        const CurrentMin = date.getMinutes()
        const currentSec = date.getSeconds()

        const finishHour = time.hour;
        const finishMin = time.min;
        const finishSec = time.sec;

        const countDownHour = finishHour - CurrentHour
        const countDownMin  = finishMin - CurrentMin
        const countDownsec = finishSec - currentSec

        const totalsec = (countDownHour*60*60) + (countDownMin*60) + (countDownsec)
    
        setHour(Math.floor(totalsec/3600))
        setMin(Math.floor((totalsec%3600) / 60))
        setSec(totalsec % 60)

        if((Math.floor(totalsec/3600)<= 0) && (Math.floor(totalsec/60) <= 0) && (totalsec % 60)<=0){
            dispatch(answerSheet(question, ans, userInfo._id))
            setInterval(window.close(),1500)
        }
    }


    return (
        <div>
            <div className='countDown'> 
                <h2>
                    {(hour<=0)? '00': (hour<10) ? "0"+hour : hour } : 
                    {(min<=0)? '00' : (min<10) ? "0"+min : min } : 
                    {(sec<=0)? '00' : (sec<10) ? "0"+sec : sec }
                </h2>
            </div>
            <div className="questionWrapper">
                <div className="questionContainer">
                    <h1>Question {i} </h1>
                    <p>{question}</p>
                    <div  className='h4InputBinder'>
                        <h4>Answer</h4>
                        <input type="text" className='addQuestionInputBox' placeholder= 'Answer...' value= {ans} onChange={(e) => setAns(e.target.value)}>
                        </input>
                    </div>
                    <div className='questionBtnContainer'>
                        {(i <= 1)? <button className='questionBtn' disabled >Previous</button> :  <button className='questionBtn' onClick={prev}>Previous</button>}
                        {(value.length > i) ? <button className='questionBtn' onClick={next} >Next</button> : <button className='questionBtn finish' onClick={finish}>Finish</button> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question
