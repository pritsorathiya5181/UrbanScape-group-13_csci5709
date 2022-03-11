import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'

// first argument of createStore() is reducer and second applyMiddleware
const store = createStore(rootReducer, composeWithDevTools())

export default store
