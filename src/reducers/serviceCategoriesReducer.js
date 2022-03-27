const initialState = []

const serviceCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_SERVICE_CATEGORIES':
        return {
          ...state,
          serviceCategoryError: action.error ? action.error : null,
          serviceCategorySuccess: action.subtype === 'success',
          serviceCategoryLoading: action.subtype === 'loading',
          serviceCategory:
            action.subtype === 'success'
              ? action.serviceCategoriesData
              : state.serviceCategoriesData,
        }

    default:
      return state
  }
}

export default serviceCategoriesReducer