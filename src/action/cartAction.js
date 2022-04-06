// Author: Aeshna Verma - B00880776

import { BASE_URL } from '../utils/string'
import moment from 'moment'
import { getCustomerUser } from '../utils/scale'


export function deleteItem(itemId, itemprice) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'DELETE_ITEM',
          subtype: 'loading',
        })

        var userInfo = getCustomerUser()
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }

         console.log(" print session userInfo: " , (userInfo))
    

        const userName = userInfo?.firstname || 'dan'
        console.log("username " , userName)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
         "servicePrice": itemprice,
           "itemId": itemId
        });

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};


fetch(`${BASE_URL}cart/${userName}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    dispatch({
      type: 'DELETE_ITEM',
      subtype: 'success',
    })
    resolve(result)
  })
  .catch((error) => {
    rejects(error)
  })
      } catch (error) {
        dispatch({
          type: 'DELETE_ITEM',
          error: error,
        })
      }
    })
  }
}


export function getCartItems() {
    return function (dispatch, getState) {
      return new Promise(async (resolve, rejects) => {
        try {
          dispatch({
            type: 'GET_ITEMS',
            subtype: 'loading',
          })
        
          var userInfo = getCustomerUser()
          if (userInfo) {
            userInfo = JSON.parse(userInfo)
          }
          const userId = userInfo?.firstname || 'dan'
          console.log("username " , userId)
  

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

  export function addCartItem(value) {
    return function (dispatch, getState) {
      return new Promise(async (resolve, rejects) => {
        try {
          console.log("Cart Items Are " + JSON.stringify(value));
          
        var userInfo = getCustomerUser()
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }
        const user = userInfo?.firstname || 'dan'
        console.log("username " , user)

          const uniqueItemId= Date.now().toString()
          const servicedate = moment(value.bookingTime).format("DD-MMM-YYYY")
          const servicetime = moment(value.bookingTime).format("HH:mm")


          var raw = {
            "itemNo": uniqueItemId,
            "serviceCategory": value.serviceCategory,
            "serviceName": value.serviceName,
            "date": servicedate,
            "time" : servicetime,
            "clientAddress": value.address,
            "clientName": value.fName,
            "clientContact": value.contactNum,
            "clientEmail": value.address,
            "servicePrice": value.price,
            "professionalName": null,
            "orderItemStatus": "Pending",
            "specialInstructions": value.instructions
          };

       
          console.log("ADD CART PARAMS: ", user, raw)
          dispatch({
            type: 'ADD_CART_ITEM',
            subtype: 'loading',
          })

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var payload = JSON.stringify(raw);

          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow'
          };

fetch(`${BASE_URL}cart/${user}`, requestOptions)
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

  
export function emptyCart() {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'DELETE_ITEM',
          subtype: 'loading',
        })

        var userInfo = getCustomerUser()
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }

         console.log(" emptyCart session userInfo: " , (userInfo))
    

        const userName = userInfo?.firstname || 'dan'
        console.log("username " , userName)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
         "user": userName
        });

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};


fetch(`${BASE_URL}cart/`, requestOptions)
  .then(response => response.json())
  .then(result => {
    dispatch({
      type: 'DELETE_ITEM',
      subtype: 'success',
    })
    resolve(result)
  })
  .catch((error) => {
    rejects(error)
  })
      } catch (error) {
        dispatch({
          type: 'DELETE_ITEM',
          error: error,
        })
      }
    })
  }
}