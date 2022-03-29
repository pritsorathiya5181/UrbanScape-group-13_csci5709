import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BASE_URL } from '../../utils/string'


const theme = createTheme()

export default function Otp(props) {
  const bgImage = require('../../asserts/images/app-bg.jpg')
  const navigateupdate = useNavigate()
  const [currentUser, setCurrentUser] = useState()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console

    var otp = data.get('otp')
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    let params = new URL(document.location).searchParams
    let currUser = params.get('user')
    // setCurrentUser(currUser);
    fetch(`${BASE_URL}auth/verifyotp/${otp}/${currUser}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === 'otp matched') {
          navigateupdate('/updatepassword', { state: currUser })
        } else if(result === 'OTP expired') {
          alert("OTP expired");
          navigateupdate('/forgetpassword')
        } else {
          alert('Enter valid otp')
        }
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Forget Password
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='otp'
                label='Enter OTP'
                name='otp'
                autoComplete='otp'
              />
            <Typography >
              *OTP is valid for 5 minutes only
            </Typography>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
              <Grid container>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
