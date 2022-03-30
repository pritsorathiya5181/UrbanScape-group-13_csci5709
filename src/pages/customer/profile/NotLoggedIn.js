import React from 'react'
import {
    Link,
    Typography,
    Grid
  } from '@mui/material'

function NotLoggedIn() {
  return (
    <div >
          <Typography variant="h6" textAlign="center" padding = "100px"> Looks like you are not signed in! </Typography>
            <Grid container justifyContent="center">
            <Link href="/userlogin" underline="hover">
            Click to go to Login Page
            </Link>
            </Grid>
    </div>
  )
}

export default NotLoggedIn