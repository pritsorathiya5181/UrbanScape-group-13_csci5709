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

    case 'GET_PROFESSIONAL_USER':
      return {
        ...state,
        professionalUserInfoError: action.error ? action.error : null,
        professionalUserInfoSuccess: action.subtype === 'success',
        professionalUserInfoLoading: action.subtype === 'loading',
        professionalUserInfo:
          action.subtype === 'success'
            ? action.professionalUserInfo
            : state.professionalUserInfo,
      }
    default:
      return state
  }
}

export default userReducer
