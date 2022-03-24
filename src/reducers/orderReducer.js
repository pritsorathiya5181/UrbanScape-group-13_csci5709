const initialState = []

const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APPROVE_SERVICE_REQUEST':
      return {
        ...state,
        acceptServiceError: action.error ? action.error : null,
        acceptServiceSuccess: action.subtype === 'success',
        acceptServiceLoading: action.subtype === 'loading',
      }
    default:
      return state
  }
}

export default activitiesReducer
