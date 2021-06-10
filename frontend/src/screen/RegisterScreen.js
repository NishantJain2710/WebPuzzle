import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../component/Message.js'
import Loader from '../component/Loader.js'
import {register} from '../actions/userActions.js'
import Header from '../component/Header.js'


const RegisterScreen = ({location,history}) => {
    const [name,setName]= useState('')
    const [enrollmentNo,setEnrollmentNo]= useState('')
    const [phoneNumber,setPhoneNumber]= useState('')
    const [password,setPassword]= useState('')
    const [cPassword,setCPassword]= useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state=> state.userRegister)
    const {loading, error, userInfo:userInfoRegister} = userRegister

    const userLogin = useSelector((state)=> state.userLogin)
    const{userInfo:userInfoLogin} = userLogin

    const redirect = location.search? location.search.split('=')[1] :  '/'

    useEffect(()=>{
        if(!(userInfoLogin && userInfoLogin.isOrganizer)){
            history.push(redirect)
        }
        if(userInfoRegister){
            setName('')
            setEnrollmentNo('')
            setPhoneNumber('')
            setPassword('')
            setCPassword('')
        }
    },[history,userInfoLogin,redirect,userInfoRegister])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(
            name.toUpperCase(),
            enrollmentNo.toUpperCase(),
            phoneNumber.toUpperCase(),
            password.toUpperCase(),
            cPassword.toUpperCase()
            ))
    }

    return (
        <div>
            <Header/>
            {loading && <Loader/>}
            {error && <Message variant='Danger'>{error}</Message>}
            {userInfoRegister && <Message variant='Success'>{userInfoRegister.message}</Message>}

            <div className="questionWrapper">
                <div className="questionContainer">
                    <h1>Register Participants</h1>
                    <form onSubmit ={submitHandler}>
                        <div className='h4InputBinder'>
                            <h4>Full Name</h4>
                            <input type="text" className='addQuestionInputBox' placeholder= 'Your Full Name' value= {name} onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>
                        <div className='h4InputBinder'>
                            <h4>Enrollment Number</h4>
                            <input type="text" className='addQuestionInputBox' placeholder= 'ASU*************' value= {enrollmentNo} onChange={(e) => setEnrollmentNo(e.target.value)}>
                            </input>
                        </div>
                        <div className='h4InputBinder'>
                            <h4>Phone Number</h4>
                            <input type="tel" className='addQuestionInputBox' placeholder= '98xxxxxxxx' value= {phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}>
                            </input>
                        </div>          
                        <div className='h4InputBinder'>
                            <h4>Password</h4>
                            <input type="password" className='addQuestionInputBox' placeholder= 'Example@123' value= {password} onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>
                        <div className='h4InputBinder'>
                            <h4>Confirm Password</h4>
                            <input type="password" className='addQuestionInputBox' placeholder= 'Example@123' value= {cPassword} onChange={(e) => setCPassword(e.target.value)}>
                            </input>
                        </div>
                        <button type='submit' className='answerSubmit'>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen
