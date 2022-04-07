/**
 * Author: Prit Ajaykumar Sorathiya - B00890175
 */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ServiceProfile.css'
import ServiceCard from './ServiceCard'
import NavBar from '../../../components/professional/NavBar/NavBar'
import AddIcon from '@mui/icons-material/Add'
import useWindowDimensions, {
  getProfessionalUser,
  getUserType,
  hasToken,
} from '../../../utils/scale'
import * as PATH from '../../../utils/string'
import * as ServiceAction from '../../../action/ServiceAction'
import Loader from '../../../components/customloader/Loader'

/**
 * ServiceProfile Component is used to display the list of services
 */
const ServiceProfile = (props) => {
  const navigate = useNavigate()
  const { width } = useWindowDimensions()

  const [serviceList, setServicesList] = useState(props.servicesData || [])
  const [serviceLoading, setServiceLoading] = useState(false)

  useEffect(() => {
    if (!hasToken() || getUserType() !== 'professional') {
      window.location.href = '/notloggedin/'
    }

    function getServices() {
      var userInfo = getProfessionalUser()
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
      }

      setServiceLoading(true)
      const userId = userInfo?._id
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

    getServices()
  }, [])

  const navigateAddService = () => {
    navigate(`${PATH.partnerBaseUrl}/addservice`)
  }

  return (
    <>
      <NavBar />

      <header className='title-view'>
        <p className='page-title'>My Services</p>
        {width > 600 && (
          <button className='add-btn' onClick={() => navigateAddService()}>
            Add Service
          </button>
        )}
      </header>

      {serviceLoading ? (
        <section className='centeredText'>
          <Loader />
        </section>
      ) : (
        <section className='service-list-container'>
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
            <section className='centeredText'>
              <h1>You haven't add any service. Please add first! :)</h1>
            </section>
          )}
        </section>
      )}

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
