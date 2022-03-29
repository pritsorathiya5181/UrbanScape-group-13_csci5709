//Author: Rikin Pineshkumar Patel

import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/professional/NavBar/NavBar'
import * as ServiceAction from '../../../action/ServiceAction'
import './Dashboard.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../../../components/customloader/Loader'
import DashboardPrimary from './DashboardPrimary'
import { hasToken } from '../../../utils/scale'

const Dashboard = (props) => {
  const [serviceLoading, setServiceLoading] = useState(false)
  const [serviceStatsData, setServiceStatsData] = useState()
  const [serviceList, setServicesList] = useState(props.servicesData || [])

  useEffect(() => {
    if (!hasToken()) {
      alert('Please login to continue')
      window.location.href = '/'
    }

    function getServicesStats() {
      setServiceLoading(true)
      const userId = 'd86aa655-fe4a-40ee-af69-67718d7ec759'
      props.action
        .getServiceStats(userId)
        .then((res) => {
          setServiceLoading(false)
          setServiceStatsData(res.serviceStats)
        })
        .catch((err) => {
          console.log(err)
          setServiceLoading(false)
        })
    }

    function getServices() {
      setServiceLoading(true)
      const userId = 'd86aa655-fe4a-40ee-af69-67718d7ec759'
      props.action
        .getRecords(userId)
        .then((res) => {
          setServiceLoading(false)
          setServicesList(res?.services)
        })
        .catch((err) => {
          setServiceLoading(false)
          console.log('err', err)
        })
    }

    getServicesStats()
    getServices()
  }, [])

  return (
    <main className='contianer'>
      <NavBar />

      {serviceLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20%',
          }}
        >
          <Loader />
        </div>
      ) : (
        serviceStatsData && (
          <DashboardPrimary
            serviceStatsData={serviceStatsData}
            serviceList={serviceList}
          />
        )
      )}
    </main>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      serviceStatsData: state.services.serviceStatsData,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(ServiceAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
