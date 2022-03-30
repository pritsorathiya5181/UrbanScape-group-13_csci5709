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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate, useRoutes } from 'react-router-dom'
import { useState } from 'react'
// import { useRoutes } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../../utils/string'

export default function UpdatePassword() {
  const bgImage = require('../../asserts/images/app-bg.jpg')
  const [passwordError, setPasswordError] = useState()
  const [confirmPasswordError, setConfirmPasswordError] = useState()
  const navigateLogin = useNavigate()
  // let route = useRoutes();
  const location = useLocation()
  console.log(location)
  // console.log(route);
  const validatePwd = (password) => {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    return re.test(password)
  }

  const handlePassword = (event) => {
    const Password = event.target.value
    if (!validatePwd(Password)) {
      setPasswordError(
        'Should have alphanumeric characters and atleast one special character'
      )
    } else if (Password?.length < 8) {
      setPasswordError('Minimum 8 characters are required')
    } else {
      setPasswordError('')
    }
  }

  const handleConfirmPassword = (event) => {
    const pass = document.getElementById('password').value
    console.log(pass)
    const cpass = event.target.value
    console.log(cpass)
    if (pass !== cpass) {
      console.log(cpass)
      setConfirmPasswordError('Confirm Password does not match to Password')
    } else {
      setConfirmPasswordError('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    if (passwordError?.length > 0) {
      alert(passwordError)
      return
    }

    if (confirmPasswordError?.length > 0) {
      alert(confirmPasswordError)
      return
    }
    var username1 = location.state
    var password = data.get('password')
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(
      `${BASE_URL}auth/updatepassword/${username1}/${password}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result == 'password updated') {
          navigateLogin('/userlogin')
        } else {
          console.log('Error updating password')
        }
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <ThemeProvider
    // theme={theme}
    >
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
              New Password
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              style={{ width: '100%' }}
            >
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Enter Username"
                name="username"
                autoComplete="username"
                type="email"
              /> */}

              <TextField
                margin='normal'
                required
                fullWidth
                id='password'
                label='Enter New Password'
                name='password'
                autoComplete='password'
                type='password'
                onBlur={(e) => handlePassword(e)}
              />
              <Typography style={{ color: 'red', width: '100%' }}>
                {passwordError}
              </Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                name='cpassword'
                label='Confirm Password'
                type='password'
                id='cpassword'
                autoComplete='current-password'
                onBlur={(e) => handleConfirmPassword(e)}
              />
              <Typography style={{ color: 'red', width: '100%' }}>
                {confirmPasswordError}
              </Typography>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                UpdatePassword
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
