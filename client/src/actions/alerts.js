import {v4 as uuidv4} from 'uuid'
import { SET_ALERT } from "./types"
import { REMOVE_ALERT } from "./types"

const setAlert = (msg, alertType,id) => (dispatch) => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload:{
            msg, alertType, id
        }
    })

    setTimeout(()=>{
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }, 2000)
}
export default setAlert
