import serviceReducer from './serviceReducer'
import orderReducer from './orderReducer'
import cartReducer from './cartReducer'
import serviceCategoriesReducer from './serviceCategoriesReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  services: serviceReducer,
  orders: orderReducer,
  cart: cartReducer,
  serviceCategories: serviceCategoriesReducer,
})

export default rootReducer
