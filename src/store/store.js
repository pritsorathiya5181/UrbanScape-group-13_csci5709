import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/rootReducer'

const middleWare = [thunk]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
