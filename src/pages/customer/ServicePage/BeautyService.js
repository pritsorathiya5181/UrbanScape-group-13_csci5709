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
      console.log("API Result" , res)
      console.log("Beauty Services are " + JSON.stringify(res.serviceCategories.filter(serviceCategory => serviceCategory.serviceCategory === 'Beauty')))
      let servicesOffered = res.serviceCategories.filter(serviceCategory => serviceCategory.serviceCategory === 'Beauty');
      setBeautyServices(servicesOffered[0].services);
      
     })
     .catch((err) => {
       console.log('Add Cart Item Error', err)
     })
}, [])

  // beautyServices.push({
  //   title: 'Head Massage',
  //   img: headMassageImage,
  //   content: 'Book our relaxing head massage to recharge your energy',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  // })
  // beautyServices.push({
  //   title: 'Hair Cut',
  //   img: haircutImage,
  //   content:
  //     'Pamper yourself with a new look with our professional hair cutting experience',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  // })
  // beautyServices.push({
  //   title: 'Facial',
  //   img: facialImage,
  //   content: 'Relax your facial muscles with our rejuvenating facial',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  // })
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
                <ServiceCard services={beautyService} />
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
