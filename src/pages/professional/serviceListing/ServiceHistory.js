import React, { useState } from 'react'
import NavBar from '../../../components/professional/NavBar/NavBar'
import * as HEADERS from '../../../utils/constant'
import CustomTable from '../../../components/professional/Table/CustomTable'
import DialogAlert from '../../../components/DialogAlert'

const ServiceHistory = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const [serviceRequests, setServiceRequests] = useState(
    HEADERS.SERVICE_REQUESTS
  )

  return (
    <>
      <NavBar />

      <header className='title-view'>
        <p className='page-title'>Proceed Services</p>
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
    </>
  )
}

export default ServiceHistory
