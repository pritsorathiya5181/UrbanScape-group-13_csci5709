/*  Author: Prit Ajaykumar Sorathiya - B00890175 */

import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/professional/NavBar/NavBar'
import * as HEADERS from '../../../utils/constant'
import CustomTable from '../../../components/professional/Table/CustomTable'
import DialogAlert from '../../../components/DialogAlert'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ServiceAction from '../../../action/ServiceAction'
import * as orderAction from '../../../action/orderAction'
import Loader from '../../../components/customloader/Loader'
import { useLocation } from 'react-router-dom'
import { hasToken } from '../../../utils/scale'

const ServiceHistory = (props) => {
  const { state } = useLocation()

  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const [serviceRequests, setServiceRequests] = useState(
    state?.requestType === 'cancelled'
      ? props?.serviceStatsData?.cancelledRequests
      : state?.requestType === 'processed'
      ? props?.serviceStatsData?.processedRequests
      : props?.serviceStatsData?.approvedRequests || []
  )
  const [serviceLoading, setServiceLoading] = useState(false)

  console.log('state', state)
  useEffect(() => {
    if (!hasToken()) {
      alert('Please login to continue')
      window.location.href = '/'
    }

    function getServicesStats() {
      setServiceLoading(true)
      const userId = 'd86aa655-fe4a-40ee-af69-67718d7ec759'
      props.serviceaction
        .getServiceStats(userId)
        .then((res) => {
          setServiceLoading(false)
          // if (props?.isCancelPage) {
          if (state?.requestType === 'cancelled') {
            setServiceRequests(res?.serviceStats?.cancelledRequests)
          } else if (state?.requestType === 'approved') {
            setServiceRequests(res?.serviceStats?.approvedRequests)
          } else {
            setServiceRequests(res?.serviceStats?.processedRequests)
          }
        })
        .catch((err) => {
          console.log(err)
          setServiceLoading(false)
        })
    }

    getServicesStats()
  }, [])

  return (
    <>
      <NavBar />

      <header className='title-view'>
        <p className='page-title'>
          {state?.requestType === 'cancelled'
            ? 'Rejected Services'
            : state?.requestType === 'approved'
            ? 'Approved Services'
            : 'Proceed Services'}
        </p>
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
              historyPage={true}
              onApprove={() => {
                console.log('Approve')
              }}
              onReject={() => {
                setIsAlertOpen(true)
              }}
            />

            <DialogAlert
              open={isAlertOpen}
              title='Reject service  request'
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
              <p>No Service History!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceHistory)
