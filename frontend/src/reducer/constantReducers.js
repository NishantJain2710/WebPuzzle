import {CONSTANT_I_INCREMENT, CONSTANT_REMOVE} from '../constants/constantConstants'

export const constantReducer = (state = {i : 0},action) =>{
    switch(action.type){
        case CONSTANT_I_INCREMENT:
            return{
                ...state,
                i: action.payload
            }
        case CONSTANT_REMOVE:
            return{
                ...state,
                i:[]
            }
        default:
            return state
    }
}