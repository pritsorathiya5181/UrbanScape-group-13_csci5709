const initialState = []

const serviceCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SERVICE_CATEGORIES':
      return {
        ...state,
        serviceCategoryError: action.error ? action.error : null,
        serviceCategorySuccess: action.subtype === 'success',
        serviceCategoryLoading: action.subtype === 'loading',
        serviceCategories:
          action.subtype === 'success'
            ? action.serviceCategories
            : state.serviceCategories,
      }

    default:
      return state
  }
}

export default serviceCategoriesReducer
