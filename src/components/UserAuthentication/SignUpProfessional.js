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
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Select } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react/cjs/react.development'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/string'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function SignUpProfessional() {
  const bgImage = require("../../asserts/images/app-bg.jpg")
  const navigate = useNavigate()

  const [fnameError, setFnameError] = useState()
  const [lnameError, setLnameError] = useState()
  const [emailError, setEmailError] = useState()
  const [phonenoError, setPhoneNo] = useState()
  const [passwordError, setPasswordError] = useState()
  const [confirmPasswordError, setConfirmPasswordError] = useState()
  const [workingHoursFrom,setWorkingHoursFrom] = useState()
  const [workingHoursTo,setWorkingHoursTo] = useState()
  const [preferredService,setPreferredService] = useState()
  const [preferredLocation,setPreferredLocation] = useState()
  const validateFName = (name) => {
    var re = /[^a-zA-Z]/
    return re.test(name)
  }
  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  const validatePwd = (password) => {
    var re = /^[A-Z]*$/
    return re.test(password)
  }
  const handleFName = (event) => {
    const firstName = event.target.value
    if (validateFName(firstName)) {
      setFnameError('Alphabets only')
    } else {
      setFnameError('')
    }
  }

  const handleLName = (event) => {
    const lastName = event.target.value
    localStorage.setItem('lname', 'lastName')
    if (validateFName(lastName)) {
      setLnameError('Alphabets only')
    } else {
      setLnameError('')
    }
  }

  const handleEmail = (event) => {
    const Email = event.target.value
    localStorage.setItem('email', 'Email')
    if (!validateEmail(Email)) {
      setEmailError('Invalid email foramt')
    } else {
      setEmailError('')
    }
  }

  const handlePhone = (event) => {
    const PhoneNo = event.target.value
    if (PhoneNo.length == 10) {
      setPhoneNo('')
    } else {
      setPhoneNo('Must be 10 digits')
    }
  }

  const handlePassword = (event) => {
    const Password = event.target.value
    if (validatePwd(Password)) {
      setPasswordError('Should have special and alphanumeric characters ')
    } else if (Password.length < 8) {
      setPasswordError('Minimum 8 characters are required')
    } else {
      setPasswordError('')
    }
  }

  const handleWorkingHours = (event) => {
    let fromHours = document.getElementById("workinghoursfrom").value;
    let toHours = document.getElementById("workinghoursto").value;
    console.log(fromHours+" "+toHours);
    let fromHrs = new Date("01/01/2000 "+fromHours);
    let toHrs = new Date("01/01/2000 "+toHours);
    if(fromHours && toHours) {
      if(fromHrs?.getTime() > toHrs?.getTime()) {
        setWorkingHoursFrom("From time should be before to time")
      }
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
    if (fnameError?.length > 0) {
      alert('Error in FirstName')
      return
    }

    if (lnameError?.length > 0) {
      alert('Error in LastName')
      return
    }
    if (emailError?.length > 0) {
      alert('Error in Email')
      return
    }
    if (phonenoError?.length > 0) {
      alert('Invalid phone Number')
      return
    }
    if (passwordError?.length > 0) {
      alert('Error in Password')
      return
    }
    if (confirmPasswordError?.length > 0) {
      alert('Error in Confirm Password')
      return
    }
    if (document.getElementById('experience').value < 0){
      alert('Invalid experience')
    }
    
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      phoneno: data.get('phoneno'),
      password: data.get('password'),
      experience: data.get('experience'),
      workinghours: data.get('workinghoursfrom') + '-' + data.get('workinghoursto'),
      preferredservice: data.get('preferredservice'),
      preferredlocation: data.get('preferredlocation'),
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(`${BASE_URL}auth/professionalsignup`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          window.location.href = '/userlogin'
        } else {
          alert(result.message)
        }
      })
      .catch((error) => console.log('error', error))

    console.log({
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      phoneno: data.get('phoneno'),
      password: data.get('password'),
      experience: data.get('experience'),
      workinghours: data.get('workinghoursto'),
      prefferedservice: data.get('preferredservice'),
      preferredlocation: data.get('preferredlocation'),
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
              Sign up
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
                id='firstname'
                label='First Name'
                name='firstname'
                autoComplete='firstname'
                onBlur={(e) => handleFName(e)}
              />
              <Typography style={{ color: 'red' }}>{fnameError}</Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                id='lastname'
                label='Last Name'
                name='lastname'
                autoComplete='lastname'
                onBlur={(e) => handleLName(e)}
              />
              <Typography style={{ color: 'red', width: '100%' }}>
                {lnameError}
              </Typography>

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
              <Typography style={{ color: 'red', width: '100%' }}>
                {emailError}
              </Typography>

              <TextField
                margin='normal'
                required
                fullWidth
                name='phoneno'
                label='Phone No'
                type='phoneno'
                id='phoneno'
                autoComplete='phoneno'
                onBlur={(e) => handlePhone(e)}
              />
              <Typography style={{ color: 'red', width: '100%' }}>
                {phonenoError}
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

              <TextField
                margin='normal'
                required
                fullWidth
                id='experience'
                label='Experience(in months)'
                name='experience'
                autoComplete='experience'
                type='number'
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='workinghoursfrom'
                label='Working hours From'
                name='workinghoursfrom'
                autoComplete='workinghoursfrom'
                type='time'
                onBlur={(e) => handleWorkingHours(e)}
              />
              <Typography style={{ color: 'red' }}>{workingHoursFrom}</Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                id='workinghoursto'
                label='Working hours To'
                name='workinghoursto'
                autoComplete='workinghoursto'
                type='time'
                onBlur={(e) => handleWorkingHours(e)}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='preferredservice'
                label='Preferred Service'
                name='preferredservice'
                autoComplete='preferredservice'
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='preferredlocation'
                label='Preferred Location'
                name='preferredlocation'
                autoComplete='preferredlocation'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='/userlogin' variant='body2'>
                    {'Already a user? Login'}
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
