import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { questionListReducer,questionCreateReducer,onlyQuestionListReducer,answerByQuestionReducer, questionDeleteReducer,questionUpdateReducer,questionDetailsReducer } from './reducer/questionReducers'
import {userLoginReducer,userRegisterReducer,userAttemptReducer,answerSheetReducer,showTimeReducer,updateTimeReducer} from './reducer/userReducers'
import{constantReducer} from './reducer/constantReducers'
const reducer = combineReducers({
        questionList: questionListReducer,
        questionCreate:questionCreateReducer,
        userLogin: userLoginReducer,
        userRegister:userRegisterReducer,
        questionDelete:questionDeleteReducer,
        questionUpdate:questionUpdateReducer,
        questionDetails: questionDetailsReducer,
        onlyQuestionList:onlyQuestionListReducer,
        answerByQuestion:answerByQuestionReducer,
        constant:constantReducer,
        userAttempt:userAttemptReducer,
        answerSheet: answerSheetReducer,
        updateTime:updateTimeReducer,
        showTime:showTimeReducer,
    })

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const iFromStorage = localStorage.getItem('i') ? JSON.parse(localStorage.getItem('i')) : 0
const initialState = {  
    constant:{
        i : iFromStorage,
    },
    userLogin:{
        userInfo : userInfoFromStorage
    }
}


const middleware = [thunk]

const store = createStore(reducer, initialState ,composeWithDevTools(applyMiddleware(...middleware)))

export default store