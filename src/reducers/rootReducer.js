import serviceReducer from './serviceReducer'
import orderReducer from './orderReducer'
import { combineReducers } from 'redux'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  services: serviceReducer,
  orders: orderReducer,
  cart: cartReducer
})

export default rootReducer
