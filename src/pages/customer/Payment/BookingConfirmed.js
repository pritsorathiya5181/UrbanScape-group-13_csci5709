import React from 'react'
import {
  Typography,
  Divider,
  Box,
  Link
} from '@mui/material'
import {useNavigate } from 'react-router-dom'

function BookingConfirmed() {

  const navigate = useNavigate()


  function handleClick(){
    console.log("clicked")
    navigate('/')
  }

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

export default BookingConfirmed