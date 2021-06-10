import axios from 'axios'
import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_ATTEMPT_REQUEST,
    USER_ATTEMPT_SUCCESS,
    USER_ATTEMPT_FAIL,
    ANSWER_SHEET_REQUEST,
    ANSWER_SHEET_SUCCESS,
    ANSWER_SHEET_FAIL,
    SHOW_TIME_REQUEST,
    SHOW_TIME_SUCCESS,
    SHOW_TIME_FAIL,
    UPDATE_TIME_REQUEST,
    UPDATE_TIME_SUCCESS,
    UPDATE_TIME_FAIL,
    
}from '../constants/userConstants.js'

export const login = (enrollmentNo,password)=> async(dispatch) =>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login',{enrollmentNo, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const logout = () => (dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_LIST_RESET})
    document.location.href = '/login'
}


export const register = (name, enrollmentNo, phoneNumber, password, cPassword)=> async(dispatch) =>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/register',{name, enrollmentNo, phoneNumber, password, cPassword}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUsers = ()=> async(dispatch, getState) =>{
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get('/api/users/showParticipants', config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })

       
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const deleteUser = (id)=> async(dispatch, getState) =>{
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/users/deleteParticipant/${id}`, config)
        dispatch({
            type: USER_DELETE_SUCCESS,
        })

       
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const requestAttempt = (id) => async(dispatch,getState) =>{
    try{
        dispatch({
            type: USER_ATTEMPT_REQUEST,
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(`/api/users/attemptcheck/${id}`, config)
        dispatch({
            type: USER_ATTEMPT_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: USER_ATTEMPT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const answerSheet = (question,answer, userId)=> async(dispatch,getState) =>{
    try {
        dispatch({
            type: ANSWER_SHEET_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.post(`/api/users/answersheet/${userId}`,{question, answer}, config)

        dispatch({
            type: ANSWER_SHEET_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ANSWER_SHEET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const showtime = ()=> async(dispatch) =>{
    try {
        dispatch({
            type: SHOW_TIME_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.get('/api/coordinator/time', config)

        dispatch({
            type: SHOW_TIME_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: SHOW_TIME_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updatetime = (hour,min,sec)=> async(dispatch,getState) =>{
    try {
        dispatch({
            type: UPDATE_TIME_REQUEST
        })
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.put('/api/coordinator/time',{hour,min,sec}, config)

        dispatch({
            type: UPDATE_TIME_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_TIME_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}