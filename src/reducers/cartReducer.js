const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
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


    default:
      return state
  }
}

export default cartReducer
