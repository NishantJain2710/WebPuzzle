import {CONSTANT_I_UPDATE, CONSTANT_REMOVE} from '../constants/constantConstants'

export const constantReducer = (state = {i : 0},action) =>{
    switch(action.type){
        case CONSTANT_I_UPDATE:
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