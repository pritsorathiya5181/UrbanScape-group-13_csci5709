import React, { useState } from 'react'
import NavBar from '../../../components/professional/NavBar/NavBar'
import * as HEADERS from '../../../utils/constant'
import CustomTable from '../../../components/professional/Table/CustomTable'
import DialogAlert from '../../../components/DialogAlert'

const ServiceRequests = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const [serviceRequests, setServiceRequests] = useState([
    {
      serviceName: 'Hair Cut',
      customerName: 'John Doe',
      customerLocation: 'New York',
      mobileNo: '+1-123-456-7890',
      serviceDetails: {
        serviceTime: '10:00 AM',
        serviceDate: new Date(),
        notes:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
      },
    },
    {
      serviceName: 'Hair Cut',
      customerName: 'John Doe',
      customerLocation: 'New York',
      mobileNo: '+1-123-456-7890',
      serviceDetails: {
        serviceTime: '10:00 AM',
        serviceDate: new Date(),
        notes:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
      },
    },
    {
      serviceName: 'Hair Cut',
      customerName: 'John Doe',
      customerLocation: 'New York',
      mobileNo: '+1-123-456-7890',
      serviceDetails: {
        serviceTime: '10:00 AM',
        serviceDate: new Date(),
        notes:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
      },
    },
    {
      serviceName: 'Hair Cut',
      customerName: 'John Doe',
      customerLocation: 'New York',
      mobileNo: '+1-123-456-7890',
      serviceDetails: {
        serviceTime: '10:00 AM',
        serviceDate: new Date(),
        notes:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
      },
    },
    {
      serviceName: 'Hair Cut',
      customerName: 'John Doe',
      customerLocation: 'New York',
      mobileNo: '+1-123-456-7890',
      serviceDetails: {
        serviceTime: '10:00 AM',
        serviceDate: new Date(),
        notes:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
      },
    },
    {
      serviceName: 'Hair Cut',
      customerName: 'John Doe',
      customerLocation: 'New York',
      mobileNo: '+1-123-456-7890',
      serviceDetails: {
        serviceTime: '10:00 AM',
        serviceDate: new Date(),
        notes:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
      },
    },
  ])

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

export default ServiceRequests
