import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// Reducers
import user from './user'
import SearchBar from './SearchBar'
import loaded from './loaded'

const reducer = combineReducers({user, SearchBar, loaded })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './SearchBar'
export * from './loaded'
