import { BASE_URL } from '../utils/string'

export function userLogin(email, password) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'LOGIN_USER',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}auth/users/${email}/${password}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('login user==', result)
            if (result.success) {
              dispatch({
                type: 'LOGIN_USER',
                subtype: 'success',
                userInfo: result.user,
              })
              resolve(result)
            } else {
              dispatch({
                type: 'LOGIN_USER',
                subtype: 'error',
                error: result.message,
              })
              resolve(result)
            }
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'LOGIN_USER',
          error: error,
        })
      }
    })
  }
}