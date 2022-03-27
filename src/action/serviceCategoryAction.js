import { BASE_URL } from '../utils/string'

export function getServices(userId) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'GET_SERVICES',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        }

        setTimeout(resolve, 20000)
        fetch(`${BASE_URL}services/serviceCategories`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('all services==', result)
            dispatch({
              type: 'GET_SERVICES',
              subtype: 'success',
              serviceCategories: result.serviceCategories
            })
            resolve(result)
          })
          .catch((error) => {
            console.log('all service error', error)
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'GET_SERVICES',
          error: error,
        })
      }
    })
  }
}