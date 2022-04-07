/**
 * Author: Prit Ajaykumar Sorathiya - B00890175
 */

import { BASE_URL } from '../utils/string'

/**
 *
 * @param {*} userId - user id of the logged in user
 * getRecords() makes a GET call to Nodejs backend api to get all the service records of the
 * logged in user from MongoDB database
 */
export function getRecords(userId) {
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

        setTimeout(resolve, 20000)
        fetch(`${BASE_URL}service/services/${userId}`, requestOptions)
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
            console.log('all service error', error)
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'GET_SERVICES',
          error: error,
        })
      }
    })
  }
}

/**
 *
 * @param {*} value - new service object
 * addService() makes a POST call to Nodejs backend api to save the new service to the MongoDB database
 */
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

        // console.log('service', JSON.stringify(value))
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
            })
            resolve(result)
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'ADD_SERVICE',
          error: error,
        })
      }
    })
  }
}

/**
 *
 * @param {*} value -service's update value object
 * @param {*} serviceId - service id of the service to be updated
 * updateService() makes a PUT call to Nodejs backend api to update the service to the MongoDB database
 */
export function updateService(value, serviceId) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'UPDATE_SERVICE',
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

        fetch(`${BASE_URL}service/${serviceId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('update service==', result)
            dispatch({
              type: 'UPDATE_SERVICE',
              subtype: 'success',
              updateService: result.service,
            })
            resolve(result)
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'UPDATE_SERVICE',
          error: error,
        })
      }
    })
  }
}

/**
 *
 * @param {*} serviceId - service id of the service to be deleted
 * deleteService() makes a DELETE call to Nodejs backend api to delete the service to the MongoDB database
 */
export function deleteService(serviceId) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'DELETE_SERVICE',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}service/${serviceId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('delete service==', result)
            dispatch({
              type: 'DELETE_SERVICE',
              subtype: 'success',
            })
            resolve(result)
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'DELETE_SERVICE',
          error: error,
        })
      }
    })
  }
}

/**
 *
 * @param {*} userId - user id of the logged in user
 * @param {*} userEmail - user email of the logged in user
 * getServiceStats() makes a GET call to Nodejs backend api to get the service stats of the logged in user
 */
export function getServiceStats(userId, userEmail) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'SERVICE_STATS',
          subtype: 'loading',
        })

        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}service/stats/${userId}/${userEmail}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('service stats==', result)
            dispatch({
              type: 'SERVICE_STATS',
              subtype: 'success',
              serviceStatsData: result.serviceStats,
            })
            resolve(result)
          })
          .catch((error) => {
            rejects(error)
          })
      } catch (error) {
        dispatch({
          type: 'SERVICE_STATS',
          error: error,
        })
      }
    })
  }
}
