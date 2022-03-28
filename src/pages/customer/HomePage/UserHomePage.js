// Author: Prit Ajaykumar Sorathiya - B00890175

import React, { useEffect, useState } from 'react'
import './UserHomePageStyle.css'
import salonImage from '../../../asserts/images/salon.jpg'
import plumbingImg from '../../../asserts/images/carpentry.jpg'
import carpentryImg from '../../../asserts/images/plumbing.jpg'
import { makeStyles } from '@mui/styles'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Slider from '../../../components/Slider'
import CategoryItem from '../../../components/CategoryItem'
import styled from 'styled-components'
import NewsLetter from '../../../components/NewsLetter'
import Footer from '../../../components/Footer'
import { mobile } from '../../../utils/scale'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as serviceCategoryAction from '../../../action/serviceCategoryAction'

const useStyles = makeStyles({
  gridcontainer: {
    paddingLeft: '25px',

    paddingRight: '25px',

    paddingTop: '50px',
  },
})

const UserHomePage = (props) => {
  const [serviceCategories, setServiceCategories] = useState([])

  useEffect(() => {
    props.action
      .getServices()
      .then((res) => {
        console.log('Static services', res)
        setServiceCategories(res?.serviceCategories)
        // setBeautyServices(servicesOffered[0].services)
      })
      .catch((err) => {
        console.log('Add Cart Item Error', err)
      })
  }, [])

  let offeredServices = []
  offeredServices.push({
    name: 'Book Salon Service',
    image: salonImage,
    description:
      'Book our salon services at affordable prices to rejuvenate your senses !!',
  })
  offeredServices.push({
    name: 'Book Carpentry Service',
    image: carpentryImg,
    description: 'Coming Soon',
  })
  offeredServices.push({
    name: 'Book Plumbing Services',
    image: plumbingImg,
    description: 'Coming Soon',
  })

  const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
  `

  return (
    <div>
      <Slider sliderData={serviceCategories} />
      <Container>
        {serviceCategories.map((item, index) => (
          <CategoryItem item={item} key={index.toString()} />
        ))}
      </Container>

      <NewsLetter />

      <Footer />
    </div>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      serviceCategories: state.serviceCategories.serviceCategories,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(serviceCategoryAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
