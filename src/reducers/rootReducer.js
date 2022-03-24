import serviceReducer from './serviceReducer'
import orderReducer from './orderReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  services: serviceReducer,
  orders: orderReducer,
})

export default rootReducer
