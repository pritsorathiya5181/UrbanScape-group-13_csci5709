/*  Author: Prit Ajaykumar Sorathiya - B00890175 */

import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import NavBar from '../../../components/professional/NavBar/NavBar'
import * as HEADERS from '../../../utils/constant'
import CustomTable from '../../../components/professional/Table/CustomTable'
import DialogAlert from '../../../components/DialogAlert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ServiceAction from '../../../action/ServiceAction'
import * as orderAction from '../../../action/orderAction'
import Loader from '../../../components/customloader/Loader'
import {
  getProfessionalUser,
  getUserType,
  hasToken,
} from '../../../utils/scale'

const ServiceRequests = (props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  // const reduxStates = useSelector((state) => state.services)

  const [serviceRequests, setServiceRequests] = useState(
    props?.serviceStatsData?.pendingRequests || []
  )
  const [serviceLoading, setServiceLoading] = useState(false)

  useEffect(() => {
    if (!hasToken() || getUserType() !== 'professional') {
      window.location.href = '/notloggedin/'
    }

    getServicesStats()
  }, [])

  function getServicesStats() {
    var userInfo = getProfessionalUser()
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    }

    setServiceLoading(true)
    const userId = userInfo?._id
    props.serviceaction
      .getServiceStats(userId)
      .then((res) => {
        setServiceLoading(false)
        setServiceRequests(res?.serviceStats?.pendingRequests)
      })
      .catch((err) => {
        console.log(err)
        setServiceRequests([])
        setServiceLoading(false)
      })
  }

  const onServiceApprove = (serviceItem) => {
    console.log(serviceItem)
    props.orderaction
      .approveServiceRequest(serviceItem)
      .then((res) => {
        swal({
          title: 'Email Send!',
          text: 'Service request approved!',
          icon: 'success',
          button: 'Done!',
        })
        getServicesStats()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onServiceCancel = (serviceItem) => {
    console.log(serviceItem)
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to accept it again!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.orderaction
          .cancelServiceRequest(serviceItem)
          .then((res) => {
            swal('Service request has been rejected!', {
              icon: 'success',
            })
            getServicesStats()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  return (
    <>
      <NavBar />

      <header className='title-view'>
        <p className='page-title'>Service Requests</p>
      </header>

      {serviceRequests?.length > 0 ? (
        <section
          style={{
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <section
            style={{
              minWidth: '60%',
              maxWidth: '90%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CustomTable
              headerData={HEADERS.SERVICE_REQUEST_HEADERS}
              serviceData={serviceRequests}
              historyPage={false}
              onApprove={(serviceItem) => {
                onServiceApprove(serviceItem)
              }}
              onReject={(serviceItem) => {
                // setIsAlertOpen(true)
                onServiceCancel(serviceItem)
              }}
            />

            <DialogAlert
              open={isAlertOpen}
              title='Reject service request'
              message='Are you sure want to reject this service request?'
              handleClose={() => {
                setIsAlertOpen(false)
              }}
              handleOpen={() => {
                setIsAlertOpen(false)
              }}
            />
          </section>
        </section>
      ) : (
        <section
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {serviceLoading ? (
            <Loader />
          ) : (
            <>
              <img
                src={require('../../../asserts/images/empty_service.png')}
                alt='EmptyService'
                style={{
                  width: '100px',
                  height: '100px',
                  marginLeft: '20px',
                }}
              />
              <p>No Service Requests</p>
            </>
          )}
        </section>
      )}
    </>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      serviceStatsData: state.services.serviceStatsData,
      orders: state.orders,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    orderaction: bindActionCreators(orderAction, dispatch),
    serviceaction: bindActionCreators(ServiceAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequests)
