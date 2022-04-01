//Author: Aeshna Verma (B00880776)

import React from 'react'
import {
    Link,
    Typography,
    Grid
  } from '@mui/material'

function NotLoggedIn() {
  return (
    <div >
          <Typography variant="h5" textAlign="center" padding = "50px">HEY ! LOOKS LIKE YOU ARE NOT LOGGED IN !!</Typography>
          <Typography variant="h6" textAlign="center">Please sign in to proceed with bookings or access already saved items in your cart </Typography>
            <Grid container justifyContent="center">
            <Link href="/userlogin" underline="hover">
            Go to Login Page
            </Link>
            </Grid>
    </div>
  )
}

export default NotLoggedIn