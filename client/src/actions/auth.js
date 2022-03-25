import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import  setAlert from  './alerts';

const register = ({name, email, password}) => async dispatch =>{
   try {
       const config = {
           headers:{
               "Content-Type":"application/json"
           }
       }
       const body = JSON.stringify({name, email, password})
       const res = await axios.post('/api/users', body, config)
       const data = res.data;
       dispatch({
           type: REGISTER_SUCCESS,
           payload: res.data
       })

   } catch (error) {
       console.log("action", error.message);

       const errors = error.response.data.errors
       console.log("errors", errors)
       if(errors){
          errors.map(err=>console.log("the error", err.msg))
          errors.map(err=>dispatch(setAlert(err.msg, "danger")))

       }
       dispatch({
        type: REGISTER_FAIL
    });
       
   }
}

export default register