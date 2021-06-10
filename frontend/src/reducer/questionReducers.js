import {
    QUESTION_CREATE_FAIL,
    QUESTION_CREATE_REQUEST,
    QUESTION_CREATE_SUCCESS,
    QUESTION_CREATE_RESET,
    QUESTION_SHOW_FAIL,
    QUESTION_SHOW_REQUEST,
    QUESTION_SHOW_SUCCESS,
    QUESTION_DELETE_REQUEST,
    QUESTION_DELETE_SUCCESS,
    QUESTION_DELETE_FAIL,
    QUESTION_UPDATE_REQUEST,
    QUESTION_UPDATE_SUCCESS,
    QUESTION_UPDATE_FAIL,
    QUESTION_UPDATE_RESET,
    QUESTION_DETAILS_REQUEST,
    QUESTION_DETAILS_SUCCESS,
    QUESTION_DETAILS_FAIL,
    QUESTION_SHOW_ONLY_REQUEST,
    QUESTION_SHOW_ONLY_SUCCESS,
    QUESTION_SHOW_ONLY_FAIL,
    SHOW_ANSWER_BY_QUESTION_REQUEST,
    SHOW_ANSWER_BY_QUESTION_SUCCESS,
    SHOW_ANSWER_BY_QUESTION_FAIL,
}from '../constants/questionConstants'

export const questionListReducer = (state = {questions: []}, action) => {
    switch(action.type){
        case QUESTION_SHOW_REQUEST:
            return{
                loding:true,
                questions: [],
            }
        case QUESTION_SHOW_SUCCESS:
            return{
                loading:false,
                questions: action.payload,
            }
        case QUESTION_SHOW_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const onlyQuestionListReducer = (state = {question: []}, action) => {
    switch(action.type){
        case QUESTION_SHOW_ONLY_REQUEST:
            return{
                loding:true,
                question: [],
            }
        case QUESTION_SHOW_ONLY_SUCCESS:
            return{
                loading:false,
                question: action.payload,
            }
        case QUESTION_SHOW_ONLY_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}





export const questionCreateReducer = (state = {}, action)=>{
    switch(action.type){
        case QUESTION_CREATE_REQUEST:
            return{loading:true}
        case QUESTION_CREATE_SUCCESS:
            return {loading:false, success:true}
        case QUESTION_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case QUESTION_CREATE_RESET:
            return{}
        default:
        return state
    }
}

export const questionDeleteReducer = (state = {}, action)=>{
    switch(action.type){
        case QUESTION_DELETE_REQUEST :
            return {loading : true}
        case QUESTION_DELETE_SUCCESS: 
            return{ loading: false, success:true}
        case QUESTION_DELETE_FAIL : 
            return{ loading: false, error: action.payload }
        default: 
        return state
    }
}


export const questionUpdateReducer = (state = {question:{}}, action)=>{
    switch(action.type){
        case QUESTION_UPDATE_REQUEST :
            return {loading : true}
        case QUESTION_UPDATE_SUCCESS: 
            return{ loading: false, success: true, question:action.payload}
        case QUESTION_UPDATE_FAIL : 
            return{ loading: false, error: action.payload }
        case QUESTION_UPDATE_RESET : 
            return{question:{}}
        default: 
        return state
    }
}

export const questionDetailsReducer = (state = {question: {}}, action)=>{
    switch(action.type){
        case QUESTION_DETAILS_REQUEST :
            return {loading : true, ...state}
        case QUESTION_DETAILS_SUCCESS: 
            return{ loading: false, question: action.payload}
        case QUESTION_DETAILS_FAIL : 
            return{ loading: false, error: action.payload }
        default: 
        return state
    }
}

export const answerByQuestionReducer = (state = {answer: []}, action) => {
    switch(action.type){
        case SHOW_ANSWER_BY_QUESTION_REQUEST:
            return{
                loding:true,
                answer: [],
            }
        case SHOW_ANSWER_BY_QUESTION_SUCCESS:
            return{
                loading:false,
                answer: action.payload,
            }
        case SHOW_ANSWER_BY_QUESTION_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

