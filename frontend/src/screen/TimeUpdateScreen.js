import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { updatetime } from '../actions/userActions'
import Loader from '../component/Loader'
import Header from '../component/Header'
import Message from '../component/Message'
    

const TimeUpdateScreen = ({history}) => {

    const dispatch = useDispatch()

    const [hours, setHours] = useState('') 
    const [minutes, setMinutes] = useState('') 
    const [seconds, setSeconds] = useState('') 

    const userLogin = useSelector((state)=> state.userLogin)
    const{userInfo} = userLogin

    const updateTime = useSelector(state=> state.updateTime)
    const {loading, error, success} = updateTime

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        
    },[history, userInfo])
    
    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(updatetime(hours,minutes,seconds))
        setHours('')
        setMinutes('')
        setSeconds('')
    }


    return (
        <div>
            <Header/>
            {loading&& <Loader/>} 
            {error && <Message variant='Danger' >{error}</Message>} 
            {success && <Message variant='Success'>Successfully Added</Message>}
             <div className="LoginWrapper">
                <div className="LoginContainer">
                    <h1>Set Timer</h1>
                    <form  onSubmit ={submitHandler}>
                        <div className='h4InputBinder'>
                            <h4>Hours</h4>
                            <input type="number" className='loginInputBox' max='23' min='0' placeholder= '0-23' value= {hours} onChange={(e) => setHours(e.target.value)}>
                            </input>
                        </div>

                        
                        <div className='h4InputBinder'>
                            <h4>Minutes</h4>
                            <input type="number" className='loginInputBox' max='59' min='0' placeholder= '0-59' value= {minutes} onChange={(e) => setMinutes(e.target.value)}>
                            </input>
                        </div>
                        <div className='h4InputBinder'>
                            <h4>Seconds</h4>
                            <input type="number" className='loginInputBox'  max='59' min='0' placeholder= '0-59' value= {seconds} onChange={(e) => setSeconds(e.target.value)}>
                            </input>
                        </div>
                        <button type='submit' className='loginBtn'>
                            SET
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TimeUpdateScreen
