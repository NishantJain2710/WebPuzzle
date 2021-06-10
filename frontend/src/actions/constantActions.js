import {CONSTANT_I_INCREMENT , CONSTANT_REMOVE} from '../constants/constantConstants'

export const iIncrementMethod = (data) => (dispatch)=>{
    dispatch({
        type:CONSTANT_I_INCREMENT,
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
