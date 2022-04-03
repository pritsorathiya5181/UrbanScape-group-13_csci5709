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

export function getProfessionalUser(email) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'GET_PROFESSIONAL_USER',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}user/findprofessional/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('professional current user==', result)
            if (result.success) {
              dispatch({
                type: 'GET_PROFESSIONAL_USER',
                subtype: 'success',
                professionalUserInfo: result.user,
              })
              resolve(result)
            } else {
              dispatch({
                type: 'GET_PROFESSIONAL_USER',
                subtype: 'error',
                error: result.message,
              })
              rejects(result)
            }
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'GET_PROFESSIONAL_USER',
          error: error,
        })
      }
    })
  }
}

export function updateProfessionalUser(email, value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'UPDATE_PROFESSIONAL_USER',
          subtype: 'loading',
        })

        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var raw = JSON.stringify(value)

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        fetch(`${BASE_URL}user/professional/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('update professional user==', result)
            if (result.success) {
              dispatch({
                type: 'UPDATE_PROFESSIONAL_USER',
                subtype: 'success',
                updateProfessional: result.user,
              })
              resolve(result)
            } else {
              dispatch({
                type: 'UPDATE_PROFESSIONAL_USER',
                subtype: 'error',
                error: result.message,
              })
              rejects(result)
            }
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'UPDATE_PROFESSIONAL_USER',
          error: error,
        })
      }
    })
  }
}

export function deleteProfessionalUser(email) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'DELETE_PROFESSIONAL_USER',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}user/professional/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('delete professional user==', result)
            if (result.success) {
              dispatch({
                type: 'DELETE_PROFESSIONAL_USER',
                subtype: 'success',
              })
              resolve(result)
            } else {
              dispatch({
                type: 'DELETE_PROFESSIONAL_USER',
                subtype: 'error',
                error: result.message,
              })
              rejects(result)
            }
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'DELETE_PROFESSIONAL_USER',
          error: error,
        })
      }
    })
  }
}

export function getCustomerUser(email) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'GET_CUSTOMER_USER',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}user/findcustomer/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('customer current user==', result)
            if (result.success) {
              dispatch({
                type: 'GET_CUSTOMER_USER',
                subtype: 'success',
                customerUserInfo: result.user,
              })
              resolve(result)
            } else {
              dispatch({
                type: 'GET_CUSTOMER_USER',
                subtype: 'error',
                error: result.message,
              })
              rejects(result)
            }
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'GET_CUSTOMER_USER',
          error: error,
        })
      }
    })
  }
}

export function updateCustomerUser(email, value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'UPDATE_CUSTOMER_USER',
          subtype: 'loading',
        })

        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var raw = JSON.stringify(value)

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        fetch(`${BASE_URL}user/customer/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('update customer user==', result)
            if (result.success) {
              dispatch({
                type: 'UPDATE_CUSTOMER_USER',
                subtype: 'success',
                updateCustomer: result.user,
              })
              resolve(result)
            } else {
              dispatch({
                type: 'UPDATE_CUSTOMER_USER',
                subtype: 'error',
                error: result.message,
              })
              rejects(result)
            }
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'UPDATE_CUSTOMER_USER',
          error: error,
        })
      }
    })
  }
}

export function deleteCustomerUser(email) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'DELETE_CUSTOMER_USER',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}user/customer/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('delete customer user==', result)
            if (result.success) {
              dispatch({
                type: 'DELETE_CUSTOMER_USER',
                subtype: 'success',
              })
              resolve(result)
            } else {
              dispatch({
                type: 'DELETE_CUSTOMER_USER',
                subtype: 'error',
                error: result.message,
              })
              rejects(result)
            }
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'DELETE_CUSTOMER_USER',
          error: error,
        })
      }
    })
  }
}
