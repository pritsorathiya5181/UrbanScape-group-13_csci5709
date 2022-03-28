import { BASE_URL } from '../utils/string'


export function deleteItem(itemId, itemprice) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'DELETE_ITEM',
          subtype: 'loading',
        })

        const userName = 'aes'

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
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


      } catch (error) {
        dispatch({
          type: 'DELETE_ITEM',
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

  export function addCartItem(value) {
    return function (dispatch, getState) {
      return new Promise(async (resolve, rejects) => {
        try {
          console.log("Cart Items Are " + JSON.stringify(value));
          console.log("Cart " + value.address);
          let user = 'Janet';
          const uniqueItemId= Date.now().toString()
      

          var raw = {
            "itemNo": uniqueItemId,
            "serviceCategory": "Beauty",
            "serviceName": "Haircut",
            "date": "22-March-2022",
            "clientAddress": value.address,
            "clientName": value.fName,
            "clientContact": value.contactNum,
            "clientEmail": value.address,
            "servicePrice": 45.6,
            "professionalName": null,
            "orderItemStatus": "Pending",
            "specialInstructions": value.instructions
          };

          console.log("CartAction Add")
          console.log("pARAMS: ", user, raw)
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