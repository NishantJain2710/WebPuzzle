import{
    USER_ATTEMPT_FAIL,
    USER_ATTEMPT_REQUEST,
    USER_ATTEMPT_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
}from '../constants/userConstants.js'

export const userLoginReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST :
            return {loading : true}
        case USER_LOGIN_SUCCESS: 
            return{ loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL : 
            return{ loading: false, error: action.payload }
        case USER_LOGOUT : 
            return{}
        default: 
        return state
    }
}


export const userRegisterReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST :
            return {loading : true}
        case USER_REGISTER_SUCCESS: 
            return{ loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL : 
            return{ loading: false, error: action.payload }
        default: 
        return state
    }
}


export const userListReducer = (state = {users:[] }, action)=>{
    switch(action.type){
        case USER_LIST_REQUEST :
            return { loading : true}
        case USER_LIST_SUCCESS: 
            return{ loading: false, users: action.payload}
        case USER_LIST_FAIL : 
            return{ loading: false, error: action.payload }
        case USER_LIST_RESET:
            return {users: []}
        default: 
        return state
    }
}


export const userDeleteReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_DELETE_REQUEST :
            return { loading : true}
        case USER_DELETE_SUCCESS: 
            return{ loading: false, success: true}
        case USER_DELETE_FAIL : 
            return{ loading: false, error: action.payload }
        default: 
        return state
    }
}

export const userAttemptReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_ATTEMPT_REQUEST :
            return { loading : true}
        case USER_ATTEMPT_SUCCESS: 
            return{ loading: false, success: true, userInfo:action.payload}
        case USER_ATTEMPT_FAIL : 
            return{ loading: false, error: action.payload }
        default: 
        return state
    }
}