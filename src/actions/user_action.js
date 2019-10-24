import {USERDATA_SUCCESS, USERDATA_FAIL, SET_USERTYPE} from './types'
import Config from "../config";

export const fetchUserData = (userid, token) => {
    return async (dispatch) => {
       fetch(Config.Api_Address + "users/userdetails/" + userid + "?token=" + token,
        {
          // mode: 'no-cors',
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
         res.json().then((response) => {
           if(response.statusCode == 200) {
            dispatch({
              type: USERDATA_SUCCESS,
              payload: response.data
             })
           }
      })
    })
    }
}


export const set_usertype = (type) => {
  return async (dispatch) => {
     dispatch({
       type: SET_USERTYPE,
       payload: type
     })
  }
}

