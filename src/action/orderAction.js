import { getProfessionalUser } from '../utils/scale'
import { BASE_URL } from '../utils/string'
import { getCustomerUser } from '../utils/scale'

export function approveServiceRequest(serviceItem) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'APPROVE_SERVICE_REQUEST',
          subtype: 'loading',
        })

        var userInfo = getProfessionalUser()
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }

        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var raw = JSON.stringify({
          itemNo: serviceItem?.itemNo,
          clientName: serviceItem?.clientName,
          clientEmail: serviceItem?.clientEmail || 'prit.sorathiya@gmail.com',
          serviceCategory: serviceItem?.serviceCategory,
          serviceName: serviceItem?.serviceName,
          professionalName: userInfo?.firstname || 'Mike',
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

        var userInfo = getProfessionalUser()
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }

        var raw = JSON.stringify({
          itemNo: serviceItem?.itemNo,
          // professionalName: userInfo?.firstname || 'Mike',
          professionalEmail: userInfo?.email || 'Mike',
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

export function saveOrderRequest(cart) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        var userInfo = getCustomerUser()
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }
        const user = userInfo?.firstname || 'dan'

        console.log('Inside save order request action ' + user)
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const oid = Date.now().toString()
        var addProperties = {
          professionalName: 'null',
          orderItemStatus: 'pending',
        }
        const orderDetails = [...cart.cartItems]

        orderDetails.forEach((element) => {
          element.professionalName = null
          element.orderItemStatus = 'Pending'
        })

        var raw = JSON.stringify({
          orderId: oid,
          userName: user,
          orderAmount: cart.cartTotalAmount,
          discountAmount: cart.cartDiscountAmount,
          taxAmount: cart.cartTaxAmount,
          orderDetails: orderDetails,
        })

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        fetch(`${BASE_URL}order/payment/${user}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log('add order :', result)
            dispatch({
              type: 'SAVE_ORDER_REQUEST',
              subtype: 'success',
            })
            resolve(result)
          })
          .catch((error) => {
            console.log('saveOrder error ', error)
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'SAVE_ORDER_REQUEST',
          error: error,
        })
      }
    })
  }
}
