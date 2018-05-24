import { combineReducers } from 'redux'

import exercise from "./exerciseReducer"
import user from "./userReducer"
import component from "./componentReducer"

export default combineReducers({
  exercise,
  user,
  component,
})
