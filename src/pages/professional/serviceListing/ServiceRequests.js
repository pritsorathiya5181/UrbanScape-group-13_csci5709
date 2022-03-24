import React, { useState } from 'react'
import NavBar from '../../../components/professional/NavBar/NavBar'
import * as HEADERS from '../../../utils/constant'
import CustomTable from '../../../components/professional/Table/CustomTable'
import DialogAlert from '../../../components/DialogAlert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as orderAction from '../../../action/orderAction'

const ServiceRequests = (props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  // const reduxStates = useSelector((state) => state.services)

  console.log(props)
  const [serviceRequests, setServiceRequests] = useState(
    props?.serviceStatsData?.pendingRequests || HEADERS?.SERVICE_REQUESTS
  )

  const onServiceApprove = (serviceItem) => {
    console.log(serviceItem)
    props.action
      .approveServiceRequest(serviceItem)
      .then((res) => {
        // console.log('approve res', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <NavBar />

      <header className='title-view'>
        <p className='page-title'>Service Requests</p>
      </header>

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
    action: bindActionCreators(orderAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequests)
