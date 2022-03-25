import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

export default function(state=initialState, action){
    switch(action.type){
        case SET_ALERT:
            return[...state, action.payload]
        break;
        case REMOVE_ALERT:
            return state.filter(alertId => alertId.id !== action.payload)
        break;
        default:
            return state
    }
}