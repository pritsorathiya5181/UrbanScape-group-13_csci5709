import { BASE_URL } from '../utils/string'

export function approveServiceRequest(serviceItem) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'APPROVE_SERVICE_REQUEST',
          subtype: 'loading',
        })

        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var raw = JSON.stringify({
          itemNo: serviceItem?.itemNo,
          clientName: serviceItem?.clientName,
          //   clientEmail: serviceItem?.clientEmail,
          clientEmail: 'prit.sorathiya@gmail.com',
          serviceCategory: serviceItem?.serviceCategory,
          serviceName: serviceItem?.serviceName,
          professionalName: 'Mike',
        })

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        const orderId = serviceItem?.orderId || '123'

        fetch(`${BASE_URL}order/approve/${orderId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('apprve services response==', result)
            dispatch({
              type: 'APPROVE_SERVICE_REQUEST',
              subtype: 'success',
            })
            resolve(result)
          })
          .catch((error) => {
            console.log('approve service error', error)
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'APPROVE_SERVICE_REQUEST',
          error: error,
        })
      }
    })
  }
}

export function cancelServiceRequest(serviceItem) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'CANCEL_SERVICE_REQUEST',
          subtype: 'loading',
        })

        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var raw = JSON.stringify({
          itemNo: serviceItem?.itemNo,
          professionalName: 'Mike',
        })

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        const orderId = serviceItem?.orderId || '123'

        fetch(`${BASE_URL}order/cancel/${orderId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('cancel services response==', result)
            dispatch({
              type: 'CANCEL_SERVICE_REQUEST',
              subtype: 'success',
            })
            resolve(result)
          })
          .catch((error) => {
            console.log('approve service error', error)
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'CANCEL_SERVICE_REQUEST',
          error: error,
        })
      }
    })
  }
}