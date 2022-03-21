import { BASE_URL } from '../utils/string'

export function getRecords() {
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

        fetch(`${BASE_URL}service/services`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('all services==', result)
            dispatch({
              type: 'GET_SERVICES',
              subtype: 'success',
              servicesData: result.services,
            })
            resolve(result)
          })
          .catch((error) => {
            console.log('recent error', error)
            rejects(error)
          })
      } catch (e) {
        dispatch({
          type: 'GET_SERVICES',
          error: e,
        })
      }
    })
  }
}

export function addService(value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'GET_SERVICES',
          subtype: 'loading',
        })

        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        console.log('service', JSON.stringify(value))
        var raw = JSON.stringify(value)

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        fetch(`${BASE_URL}service/addservice`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('add service==', result)
            dispatch({
              type: 'ADD_SERVICE',
              subtype: 'success',
              // addData: result.data,
            })
            resolve(result)
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (e) {
        dispatch({
          type: 'ADD_SERVICE',
          error: e,
        })
      }
    })
  }
}
