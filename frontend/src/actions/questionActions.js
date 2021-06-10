import axios from 'axios'

import {
    QUESTION_CREATE_FAIL,
    QUESTION_CREATE_REQUEST,
    QUESTION_CREATE_SUCCESS,
    QUESTION_DELETE_FAIL,
    QUESTION_DELETE_REQUEST,
    QUESTION_DELETE_SUCCESS,
    QUESTION_SHOW_FAIL,
    QUESTION_SHOW_REQUEST,
    QUESTION_SHOW_SUCCESS,
    QUESTION_UPDATE_FAIL,
    QUESTION_UPDATE_REQUEST,
    QUESTION_UPDATE_SUCCESS,
    QUESTION_DETAILS_REQUEST,
    QUESTION_DETAILS_SUCCESS,
    QUESTION_DETAILS_FAIL,
    QUESTION_SHOW_ONLY_SUCCESS,
    QUESTION_SHOW_ONLY_FAIL,
    QUESTION_SHOW_ONLY_REQUEST,
    SHOW_ANSWER_BY_QUESTION_REQUEST,
    SHOW_ANSWER_BY_QUESTION_SUCCESS,
    SHOW_ANSWER_BY_QUESTION_FAIL
}from '../constants/questionConstants'

export const listQuestions = () => async(dispatch,getState) =>{
    try{
        dispatch({type : QUESTION_SHOW_REQUEST})

        const{userLogin: {userInfo}} = getState()
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            },
        }

        const {data} = await axios.get('/api/coordinator/allQuestions',config)

        dispatch({
            type : QUESTION_SHOW_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: QUESTION_SHOW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}


export const listQuestionsOnly = () => async(dispatch,getState) =>{
    try{
        dispatch({type : QUESTION_SHOW_ONLY_REQUEST})

        const{userLogin: {userInfo}} = getState()
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            },
        }

        const {data} = await axios.get('/api/coordinator/questionsOnly',config)
        dispatch({
            type : QUESTION_SHOW_ONLY_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: QUESTION_SHOW_ONLY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}

export const createQuestion = (question)=> async(dispatch,getState)=>{
    try {
        dispatch({type: QUESTION_CREATE_REQUEST })

        const{userLogin: {userInfo}} = getState()
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            },
        }

        await axios.post('/api/coordinator/addQuestions',question, config)
        dispatch({
            type: QUESTION_CREATE_SUCCESS
        })
        
    } catch (error) {
        dispatch({
            type: QUESTION_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getAnswerByQuestion = (questions)=> async(dispatch,getState)=>{
    try {
        dispatch({type: SHOW_ANSWER_BY_QUESTION_REQUEST })

        const{userLogin: {userInfo}} = getState()
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            },
        }
        const {data} = await axios.post('/api/coordinator/getAnswer',questions, config)
        dispatch({
            type: SHOW_ANSWER_BY_QUESTION_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: SHOW_ANSWER_BY_QUESTION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteQuestion = (id)=> async(dispatch, getState) =>{
    try {
        dispatch({
            type: QUESTION_DELETE_REQUEST,
        })
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        }

        await axios.delete(`/api/coordinator/deleteQuestion/${id}`,config)
        dispatch({
            type: QUESTION_DELETE_SUCCESS,
        })

       
    } catch (error) {
        dispatch({
            type: QUESTION_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateQuestion = (question)=> async(dispatch, getState) =>{
    try {
        dispatch({
            type: QUESTION_UPDATE_REQUEST,
        })
        const {userLogin : {userInfo}} = getState()
        const config = {
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${userInfo.token}` },
        }

        const {data} = await axios.put(`/api/coordinator/editQuestion/${question._id}`,question,config)
        dispatch({
            type: QUESTION_UPDATE_SUCCESS,
            payload: data
        })

       
    } catch (error) {
        dispatch({
            type: QUESTION_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listQuestionDetails = (id) =>async(dispatch,getState) =>{
    try {
        dispatch({ type : QUESTION_DETAILS_REQUEST})


        const {userLogin : {userInfo}} = getState()
        const config = {
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${userInfo.token}` },
        }
        
        const {data} = await axios.get(`/api/coordinator/questionDetails/${id}`,config)
        dispatch({
            type: QUESTION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: QUESTION_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}