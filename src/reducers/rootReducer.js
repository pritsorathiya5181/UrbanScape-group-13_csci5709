import serviceReducer from './serviceReducer'
import orderReducer from './orderReducer'
import cartReducer from './cartReducer'
import serviceCategoriesReducer from './serviceCategoriesReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  services: serviceReducer,
  orders: orderReducer,
  cart: cartReducer,
  serviceCategories: serviceCategoriesReducer,
  user: userReducer,
})

export default rootReducer
