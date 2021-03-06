// Author: Aeshna Verma - B00880776
const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_ITEM':
      return {
        ...state,
        removeServiceError: action.error ? action.error : null,
        removeServiceSuccess: action.subtype === 'success',
        removeServiceLoading: action.subtype === 'loading',
      }
      case 'GET_ITEMS':
        return {
          ...state,
          cartDataError: action.error ? action.error : null,
          cartDataSuccess: action.subtype === 'success',
          cartDataLoading: action.subtype === 'loading',
          cartData:
            action.subtype === 'success'
              ? action.cartData
              : state.cartData,
        }
        case 'ADD_CART_ITEM':
        return {
          ...state,
          cartAddDataError: action.error ? action.error : null,
          cartAddDataSuccess: action.subtype === 'success',
          cartAddDataLoading: action.subtype === 'loading',
        }


    default:
      return state
  }
}

export default cartReducer
