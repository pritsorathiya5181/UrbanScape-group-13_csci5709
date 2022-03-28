const initialState = []

const newsletterSubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMAIL_SUBSCRIPTION':
      return {
        ...state,
        newsletterError: action.error ? action.error : null,
        newsletterSuccess: action.subtype === 'success',
        newsletterLoading: action.subtype === 'loading'
      }

    default:
      return state
  }
}

export default newsletterSubscriptionReducer
