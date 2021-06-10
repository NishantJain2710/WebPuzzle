import {CONSTANT_I_UPDATE , CONSTANT_REMOVE} from '../constants/constantConstants'

export const iUpdateMethod = (data) => (dispatch)=>{
    dispatch({
        type:CONSTANT_I_UPDATE,
        payload: data
    })
    localStorage.setItem('i',data)
}
export const iRemoveMethod = () => (dispatch) =>{
    dispatch({
        type:CONSTANT_REMOVE,
    })
    localStorage.removeItem('i')
}
