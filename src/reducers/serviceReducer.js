const initialState = []

const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SERVICE':
      return {
        ...state,
        addServiceError: action.error ? action.error : null,
        addServiceSuccess: action.subtype === 'success',
        addServiceLoading: action.subtype === 'loading',
        addService:
          action.subtype === 'success' ? action.addService : state.addService,
      }
    case 'GET_SERVICES':
      return {
        ...state,
        servicesDataError: action.error ? action.error : null,
        servicesDataSuccess: action.subtype === 'success',
        servicesDataLoading: action.subtype === 'loading',
        servicesData:
          action.subtype === 'success'
            ? action.servicesData
            : state.servicesData,
      }
    default:
      return state
  }
}

export default activitiesReducer
