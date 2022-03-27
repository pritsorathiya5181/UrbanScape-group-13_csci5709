import { BASE_URL } from '../utils/string'

export function removeCartItemRequest(serviceItem) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'REMOVE_ITEM',
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

export function getCartItems(userId) {
    return function (dispatch, getState) {
      return new Promise(async (resolve, rejects) => {
        try {
          dispatch({
            type: 'GET_ITEMS',
            subtype: 'loading',
          })
  
          var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          }
  
          fetch(`${BASE_URL}cart/${userId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log('get Items result: ', result.cart)
              dispatch({
                type: 'GET_ITEMS',
                subtype: 'success',
                cartData: result.cart
              })
              resolve(result)
            })
            .catch((error) => {
              rejects(error)
            })
        } catch (error) {
          dispatch({
            type: 'GET_ITEMS',
            error: error,
          })
        }
      })
    }
  }

  export function addCartItem(user, value) {
    return function (dispatch, getState) {
      return new Promise(async (resolve, rejects) => {
        try {

          console.log("CartAction Add")
          console.log("pARAMS: ", user, value)
          dispatch({
            type: 'ADD_CART_ITEM',
            subtype: 'loading',
          })

          var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(value);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${BASE_URL}cart/${user.trim()}`, requestOptions)
  .then(response => response.text())
  .then((result) => {
    console.log('add cart item :', result)
    dispatch({
      type: 'ADD_CART_ITEM',
      subtype: 'success',
    })
    resolve(result)
  })
  .catch((error) => {
    console.log("cartAction error ",error)
    rejects(error)
  })
  
         
        } catch (error) {
          dispatch({
            type: 'ADD_CART_ITEM',
            error: error,
          })
        }
      })
    }
  }