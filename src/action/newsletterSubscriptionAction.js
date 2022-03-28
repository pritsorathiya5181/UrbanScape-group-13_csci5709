import { BASE_URL } from '../utils/string'

export function subscribeToNewsletter(emailId) {
    return function (dispatch, getState) {
      return new Promise(async (resolve, rejects) => {
        try {

          var data = {
              email: emailId
          };

          dispatch({
            type: 'ADD_EMAIL_SUBSCRIPTION',
            subtype: 'loading',
          })

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var payload = JSON.stringify(data);

          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow'
          };

fetch(`${BASE_URL}subscribe`, requestOptions)
  .then(response => response)
  .then((result) => {
    console.log('Adding Subscription:', result)
    dispatch({
      type: 'ADD_EMAIL_SUBSCRIPTION',
      subtype: 'success',
    })
    resolve(result)
  })
  .catch((error) => {
    console.log("Newsletter Subscription Error ",error)
    rejects(error)
  })

        } catch (error) {
          dispatch({
            type: 'ADD_EMAIL_SUBSCRIPTION',
            error: error,
          })
        }
      })
    }
  }
