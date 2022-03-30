/**
 * Author: Priti Sri Pandey - B00877337
 */
import React from 'react'
import ServiceCard from './ServiceCard'
import headMassageImage from '../../../asserts/images/head-massage.jpg'
import facialImage from '../../../asserts/images/facial.jpg'
import haircutImage from '../../../asserts/images/haircut.jpg'
import Calendar from '../../../components/customer/DateTimePicker/Calendar'
import * as serviceCategoryAction from '../../../action/serviceCategoryAction'
import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  div: {
    backgroundImage: `url(../../asserts/images/facial.jpg)`,
  },

  gridcontainer: {
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '50px',
    paddingBottom: '50px',
    justifyContent: 'center',
  },

  header: {
    textAlign: 'center',
  },

  button: {
    justifyContent: 'center',
  },
})

function BeautyService(props) {
  const classes = useStyles()
  const [beautyServices, setBeautyServices] = useState([]);
  const serviceCategoryName = 'Beauty';

  useEffect(() => {
    props.action.getServices().then((res) => {
      let servicesOffered = res.serviceCategories.filter(serviceCategory => serviceCategory.serviceCategory === 'Beauty');
      setBeautyServices(servicesOffered[0].services);
      
     })
     .catch((err) => {
       console.log('Add Cart Item Error', err)
     })
}, [])
  return (
    <div className={classes.header}>
      <Typography style={{ textAlign: 'center', padding: '20px' }} variant='h3'>
        Beauty Services
      </Typography>
      <Grid container spacing={1} className={classes.gridcontainer}>
        {beautyServices.map((beautyService) => {
          return (
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <ServiceCard services={beautyService} serviceCategory={serviceCategoryName} />
              </div>
            </Grid>
          )
        })}
        {/* <Calendar></Calendar> */}
      </Grid>
      {/* <Button className={classes.button} variant='contained' color='primary'>
        Book Service
      </Button> */}
    </div>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      serviceCategories: state.serviceCategories
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(serviceCategoryAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeautyService)
