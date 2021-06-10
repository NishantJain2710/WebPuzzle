import React, { useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions' 
import Loader from '../component/Loader'
import Message from '../component/Message'
import Header from '../component/Header.js'


const LoginScreen = ({location, history}) => {

    const [enrollmentNo, setEnrollmentNo] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(enrollmentNo.toUpperCase(), password.toUpperCase()))
    }


    return (
        <div>  
            <Header/>
            {loading && <Loader/>}
            {error && <Message variant='Danger'>{error}</Message>}
            <div className="LoginWrapper">
                <div className="LoginContainer">
                    <h1>Login</h1>
                    <form  onSubmit ={submitHandler}>
                        <div  className='h4InputBinder'>
                            <h4>Enrollment Number</h4>
                            <input type="text" className='loginInputBox'  placeholder= 'ASU************' value= {enrollmentNo} onChange={(e) => setEnrollmentNo(e.target.value)}>
                            </input>
                        </div>

                        
                        <div  className='h4InputBinder'>
                            <h4>Password </h4>
                            <input type="password" className='loginInputBox' placeholder= 'Example@123' value= {password} onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>
                        <button type='submit' className='loginBtn'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
