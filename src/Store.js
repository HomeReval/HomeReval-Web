import { applyMiddleware, createStore } from 'redux'
  
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import Reducer from './reducers'

const middleware = applyMiddleware(promise(), thunk)

export default createStore(Reducer, middleware)
