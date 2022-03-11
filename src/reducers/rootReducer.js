import serviceReducer from './serviceReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  services: serviceReducer,
})

export default rootReducer
