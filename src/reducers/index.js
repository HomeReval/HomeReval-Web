import { combineReducers } from 'redux'

import exercise from "./exerciseReducer"
import user from "./userReducer"
import component from "./componentReducer"
import alert from "./alertReducer"

export default combineReducers({
  exercise,
  user,
  component,
  alert
})
