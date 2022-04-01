import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/string'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userAction from '../../action/userAction'

const theme = createTheme()

const UserLogin = (props) => {
  const bgImage = require('../../asserts/images/app-bg.jpg')
  const navigateToHome = useNavigate()
  const [errors, setErrors] = React.useState({})
  const [fnameError, setFnameError] = useState()
  const [lnameError, setLnameError] = useState()
  const [emailError, setEmailError] = useState()
  const [phonenoError, setPhoneNo] = useState()
  const [passwordError, setPasswordError] = useState()
  const [confirmPasswordError, setConfirmPasswordError] = useState()

  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  const validatePwd = (password) => {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    return re.test(password)
  }
  const handleEmail = (event) => {
    const Email = event.target.value
    localStorage.setItem('email', 'Email')
    if (!validateEmail(Email)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
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

  const handleSubmit = (event) => {
    setEmailError('')
    setPasswordError('')
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (emailError?.length > 0) {
      alert(emailError)
      return
    }

    if (passwordError?.length > 0) {
      alert(passwordError)
      return
    }

    var email = data.get('email')
    var password = data.get('password')

    // var raw = ''

    // var requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow',
    // }

    props.action
      .userLogin(email, password)
      .then((result) => {
        if (result.message === 'User not registered') {
          console.log('user not registered')
          setEmailError(result.message)
        } else if (result.message === 'Wrong password') {
          console.log('Invalid Password')
          setPasswordError('Invalid Email/Password')
        } else if (result.message === 'Welcome Professional') {
          localStorage.setItem('accesstoken', result.accessToken)
          localStorage.setItem('usertype', 'professional')
          localStorage.setItem('professional', JSON.stringify(result.user))
          console.log('!!Welcome to Urbanscape!!')
          window.location.href = '/professional'
        } else {
          localStorage.setItem('accesstoken', result.accessToken)
          localStorage.setItem('usertype', 'customer')
          console.log('!!Welcome to Urbanscape!!')
          window.location.href = '/'
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
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
              Login
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
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onBlur={(e) => handleEmail(e)}
              />
              {/* <p style={{color:"red"}}>{emailError}</p> */}
              <Typography style={{ color: 'red', width: '500px' }}>
                {emailError}
              </Typography>

              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onBlur={(e) => handlePassword(e)}
              />
              {/* <p style={{color:"red"}}>{passwordError}</p> */}
              <Typography style={{ color: 'red', width: '500px' }}>
                {passwordError}
              </Typography>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='/forgetpassword' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs={5}>
                  <Link href='/signupprofessional' variant='body2'>
                    New professional?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/signupuser' variant='body2'>
                    {'New User?'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      userInfo: state.user.userInfo,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(userAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
