import { BASE_URL } from '../utils/string'

export function getServices() {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'GET_SERVICE_CATEGORIES',
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
            dispatch({
              type: 'GET_SERVICE_CATEGORIES',
              subtype: 'success',
              serviceCategories: result.serviceCategories,
            })
            resolve(result)
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'GET_SERVICE_CATEGORIES',
          error: error,
        })
      }
    })
  }
}
