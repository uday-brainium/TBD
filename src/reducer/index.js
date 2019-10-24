import { combineReducers } from 'redux'
import userdata from './userdata_reducer'


export default combineReducers({
  primaryuserdata: userdata,
});
