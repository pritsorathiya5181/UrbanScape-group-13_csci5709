// Author: Aeshna Verma - B00880776

import React, { useEffect, useState } from 'react'
import {
  Typography,
  Divider,
  Box,
  Link
} from '@mui/material'
import {useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as cartAction from '../../../action/cartAction'
import { bindActionCreators } from 'redux'
import { hasToken } from '../../../utils/scale'




const BookingConfirmed = (props) => {

  const navigate = useNavigate()


  function handleClick(){
    console.log("clicked")
    navigate('/')
  }

  function emptyCart() {
    //  const user = 'dan'
      props.action
        .emptyCart()
        .then((res) => {
          console.log("Empty cart after booking : " , res)
    
        })
        .catch((err) => {
           console.log('err', err)
        })
      }

  useEffect(() => {

    if (!hasToken()) {
      window.location.href = '/customer/unauthenticated/'
    }
     emptyCart() 
  }, [])


  return (
    <div>

        <Box display = "flex"
    justifyContent="center"
    alignItems = "center"
    padding='30px'> 
    <Typography  variant = "h3" display="block" >Booking Confirmed!  </Typography> 
    </Box>
    <Box display = "flex"
    justifyContent="center"
    alignItems = "center"
    padding='30px'> 
    <Typography  variant = "h4" display="block" > Professional details will be sent on your registered email soon.  </Typography> 
    </Box>

    <Box display = "flex"
    justifyContent="center"
    alignItems = "center"
    padding='30px'> 
    <Link variant='h5' onClick={handleClick}> Keep shopping! </Link> 
    </Box>


    </div>
  )
}



function mapStateToProps(state) {
  if (state) {
    return {
      cartData: state.cart
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(cartAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirmed)