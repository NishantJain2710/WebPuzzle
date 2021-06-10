import React,{useState,useEffect} from 'react'
import {iIncrementMethod} from '../actions/constantActions'
import {useDispatch} from 'react-redux'
import Message from './Message'



const Questions = ({value}) => {

    const dispatch = useDispatch()

    const [questions , setQuestion] = useState('')
    const [ans , setAns] = useState('')
    const [correct , setCorrect] = useState(false)
    const [wrong , setWrong] = useState(false)
    const [finish , setFinish] = useState(false)
    var i = JSON.parse(localStorage.getItem('i'))
    useEffect(()=>{
        if(value){
            setQuestion(value[i-1].question)
        }
    },[value, i, setQuestion,setCorrect,setWrong,setFinish])
    const clickHandler = (e) =>{
        e.preventDefault()
        if(value.length > i){
            if(value[i-1].answer === ans.toUpperCase()){
                i++
                dispatch(iIncrementMethod(i))
                setCorrect(true)
                setFinish(false)
                setWrong(false)
                if(document.getElementById('alert')){
                    document.getElementById('alert').style.display = 'block';
                }
                setQuestion(value[i-1].question)
                setAns('')
            }else if(value[i-1].answer !== ans.toUpperCase()){
                setCorrect(false)
                setFinish(false)
                setWrong(true)
                if(document.getElementById('alert')){
                    document.getElementById('alert').style.display = 'block';
                }
                setQuestion(value[i-1].question)
            }
        }else if(value.length === i){
            if(value[i-1].answer === ans.toUpperCase()){
                setCorrect(false)
                setFinish(true)
                setWrong(false)
                if(document.getElementById('alert')){
                    document.getElementById('alert').style.display = 'block';
                }
                setInterval(() => {
                    window.close()
                }, 5000);
            }else if(value[i-1].answer !== ans.toUpperCase()){
                setCorrect(true)
                setFinish(false)
                setWrong(true)
                if(document.getElementById('alert')){
                    document.getElementById('alert').style.display = 'block';
                }
                setQuestion(value[i-1].question)
            }
        }else if(value.length < i){
            window.close()
        }
    }
    
    return (
        <div>
            {correct && <Message variant='Success' onClick={()=>setCorrect(false)} >Correct Answer</Message>}
            {wrong && <Message variant='Danger' onClick={()=>setWrong(false)}>Wrong Answer</Message>}
            {finish && <Message variant='Success' onClick={()=>setFinish(false)}>Quiz over, You can close this window</Message>}
            {!finish && (
            <div className="questionWrapper">
                <div className="questionContainer">
                    <h1>Question {i} </h1>
                    <p>{questions}</p>
                    <div  className='h4InputBinder'>
                        <h4>Answer</h4>
                        <input type="text" className='addQuestionInputBox' placeholder= 'Answer...' value= {ans} onChange={(e) => setAns(e.target.value)}>
                        </input>
                    </div>
                    <button onClick={clickHandler} className='answerSubmit'>
                        submit Answer
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Questions

