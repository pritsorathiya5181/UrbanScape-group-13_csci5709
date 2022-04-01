/*  Author: Prit Ajaykumar Sorathiya - B00890175 */

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        userInfoError: action.error ? action.error : null,
        userInfoSuccess: action.subtype === 'success',
        userInfoLoading: action.subtype === 'loading',
        userInfo:
          action.subtype === 'success' ? action.userInfo : state.userInfo,
      }

    case 'GET_CUSTOMER_USER':
      return {
        ...state,
        customerUserInfoError: action.error ? action.error : null,
        customerUserInfoSuccess: action.subtype === 'success',
        customerUserInfoLoading: action.subtype === 'loading',
        customerUserInfo:
          action.subtype === 'success'
            ? action.customerUserInfo
            : state.customerUserInfo,
      }

    case 'UPDATE_CUSTOMER_USER':
      return {
        ...state,
        updateCustomerError: action.error ? action.error : null,
        updateCustomerSuccess: action.subtype === 'success',
        updateCustomerLoading: action.subtype === 'loading',
        updateCustomer:
          action.subtype === 'success'
            ? action.updateCustomer
            : state.updateCustomer,
      }

    case 'DELETE_CUSTOMER_USER':
      return {
        ...state,
        deleteCustomerError: action.error ? action.error : null,
        deleteCustomerSuccess: action.subtype === 'success',
        deleteCustomerLoading: action.subtype === 'loading',
      }

    default:
      return state
  }
}

export default userReducer
