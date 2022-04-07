//Author: Rikin Pineshkumar Patel

import './styles.css'
import { useState } from 'react'
import swal from 'sweetalert'
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box,
} from '@mui/material'
import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { BASE_URL } from '../../../utils/string'
import { useNavigate } from 'react-router-dom'

export default function Contact() {
  let navigate = useNavigate()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        city: city,
        state: state,
        zip: zip,
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      fetch(`${BASE_URL}support`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          swal({
            title: 'Requested successfully!',
            text: 'Our team will reach out to you on your e-mail soon.',
            icon: 'success',
            button: 'Done!',
          })
          window.location.href = '/'
        })
        .catch((error) => console.log('error', error))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='App'>
      <Typography variant='h5'>Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ maxWidth: '300px', width: '50%', margin: '5px' }}
          type='text'
          label='First Name'
          variant='outlined'
          name='firstname'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <br />
        <TextField
          style={{ maxWidth: '300px', width: '50%', margin: '5px' }}
          type='text'
          label='Last Name'
          variant='outlined'
          name='lastname'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <br />
        <TextField
          style={{ maxWidth: '300px', width: '50%', margin: '5px' }}
          type='text'
          label='Email Address'
          variant='outlined'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          style={{ maxWidth: '300px', width: '50%', margin: '5px' }}
          type='text'
          label='City'
          variant='outlined'
          name='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <TextField
          style={{ maxWidth: '300px', width: '50%', margin: '5px' }}
          type='text'
          label='State'
          variant='outlined'
          name='state'
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <br />
        <TextField
          style={{ maxWidth: '300px', width: '50%', margin: '5px' }}
          type='text'
          label='ZIP'
          variant='outlined'
          name='zip'
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <br />
        <Button variant='contained' color='primary' type='submit'>
          Send Request
        </Button>
      </form>
    </div>
  )
}
