const initialState = []

const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SERVICE':
      return [...state, action.payload.serviceObj]
    default:
      return state
  }
}

export default activitiesReducer
