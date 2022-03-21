const initialState = []

const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SERVICE':
      return {
        ...state,
        addServiceError: action.error ? action.error : null,
        addServiceSuccess: action.subtype === 'success',
        addServiceLoading: action.subtype === 'loading',
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
    case 'UPDATE_SERVICE':
      return {
        ...state,
        updateServiceError: action.error ? action.error : null,
        updateServiceSuccess: action.subtype === 'success',
        updateServiceLoading: action.subtype === 'loading',
        updateService:
          action.subtype === 'success'
            ? action.updateService
            : state.updateService,
      }
    case 'DELETE_SERVICE':
      return {
        ...state,
        deleteServiceError: action.error ? action.error : null,
        deleteServiceSuccess: action.subtype === 'success',
        deleteServiceLoading: action.subtype === 'loading',
      }
    default:
      return state
  }
}

export default activitiesReducer
