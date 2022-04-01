/**
 * Author: Priti Sri Pandey - B00877337
 */

import React, { useEffect, useState } from 'react'
import ServiceCarousel from './ServiceCarousel'
import { makeStyles } from '@mui/styles'
import styled from 'styled-components'
import NewsLetter from '../../../components/NewsLetter'
import Footer from '../../../components/Footer'
import { mobile } from '../../../utils/scale'
import { bindActionCreators } from 'redux'
import ServiceTile from './ServiceTile'
import { connect } from 'react-redux'
import Grid from '@mui/material/Grid'
import * as serviceCategoryAction from '../../../action/serviceCategoryAction'

const useStyles = makeStyles({
  gridcontainer: {
    paddingLeft: '25px',

    paddingRight: '25px',

    paddingTop: '50px',
  },
})

/**
 * UserHomePage sections the home page into carousel, service categories tiles, newsletter and footer.
 */
const UserHomePage = (props) => {
  const [serviceCategories, setServiceCategories] = useState([])
  const classes = useStyles()

  useEffect(() => {
    props.action
      .getServices()
      .then((res) => {
        console.log('Static services', res)
        setServiceCategories(res?.serviceCategories)
      })
      .catch((err) => {
        console.log('Add Cart Item Error', err)
      })
  }, [])

  const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
  `

  return (
    <div>
      {/* Carousel Component */}
      <div>
        <Grid item xs={12} sm={6} md={1}>
          <ServiceCarousel categories={serviceCategories} />

        </Grid>
      </div>

      {/*ServiceTile component to show each service category detail on tiles */}
      <div>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
          {serviceCategories.map((service, index) => {
            return (
              <Grid container spacing={0} key={index.toString()} item xs={12} sm={6} md={4}>
                <div style={{ width: "100%" }}>
                  <ServiceTile service={service} />
                </div>
              </Grid>
            )
          })}
        </Grid>
      </div>

      {/*Newsletter component for subscribing to company newsletters */}
      <NewsLetter />

      {/*Footer section with About Us, Quick Links and Company contact information */}
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
