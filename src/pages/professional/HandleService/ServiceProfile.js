import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ServiceProfile.css'
import ServiceCard from './ServiceCard'
import NavBar from '../../../components/professional/NavBar/NavBar'
import AddIcon from '@mui/icons-material/Add'
import useWindowDimensions from '../../../utils/scale'
import * as PATH from '../../../utils/string'
import * as ServiceAction from '../../../action/ServiceAction'

const ServiceProfile = (props) => {
  const navigate = useNavigate()
  const { width } = useWindowDimensions()

  const [serviceList, setServicesList] = useState(props.servicesData || [])

  useEffect(() => {
    props.action
      .getRecords()
      .then((res) => {
        setServicesList(res?.services)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  // setServices(servicesList)
  const navigateAddService = () => {
    navigate(`${PATH.partnerBaseUrl}/addservice`)
  }

  return (
    <>
      <NavBar />

      <div className='title-view'>
        <p className='page-title'>My Services</p>
        {width > 600 && (
          <button className='add-btn' onClick={() => navigateAddService()}>
            Add Service
          </button>
        )}
      </div>

      <section
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
        }}
      >
        {serviceList?.length > 0 ? (
          <section className='service-item'>
            <section
              className={
                width > 600
                  ? width > 1085
                    ? 'service-row'
                    : 'service-row-center'
                  : 'service-column'
              }
            >
              {serviceList.map((item, index) => {
                return <ServiceCard key={index.toString()} item={item} />
              })}
            </section>
          </section>
        ) : (
          <section className='centered'>
            <h1>You haven't add any service. Please add first! :)</h1>
          </section>
        )}
      </section>

      {width < 600 && (
        <section
          className='footer-add-btn'
          onClick={() => navigateAddService()}
        >
          <AddIcon fontSize='large' sx={{ color: 'white' }} />
        </section>
      )}
    </>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      servicesData: state.services.servicesData,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(ServiceAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceProfile)
