import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/professional/NavBar/NavBar'
import * as ServiceAction from '../../../action/ServiceAction'
import './Dashboard.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../../../components/customloader/Loader'

const Dashboard = (props) => {
  const [serviceLoading, setServiceLoading] = useState(false)

  useEffect(() => {
    function getServicesStats() {
      setServiceLoading(true)
      const userId = 'd86aa655-fe4a-40ee-af69-67718d7ec759'
      props.action
        .getServiceStats(userId)
        .then((res) => {
          setServiceLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setServiceLoading(false)
        })
    }

    getServicesStats()
  }, [])

  return (
    <main className='contianer'>
      <NavBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80%',
        }}
      >
        {serviceLoading && <Loader />}
      </div>
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
