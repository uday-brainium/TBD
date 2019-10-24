import {
    USERDATA_SUCCESS,
    USERDATA_FAIL,
    SET_USERTYPE
   } from '../actions/types';

  export default function(state = {}, action) {     
      switch (action.type) {
        case USERDATA_SUCCESS:
          return { ...state, userdata: action.payload };
        case USERDATA_FAIL:
          return { ...state, userdata: action.payload };
        case SET_USERTYPE:
          return { ...state, type: action.payload };
        default:
          return state;
      }
    }
  