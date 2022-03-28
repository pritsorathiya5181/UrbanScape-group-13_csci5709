// Author: Prit Ajaykumar Sorathiya - B00890175

import { Send } from '@mui/icons-material'
import styled from 'styled-components'
import { mobile } from '../utils/scale'
import * as newsletterSubscriptionAction from '../action/newsletterSubscriptionAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import TextField from '@mui/material/TextField'
import { Box, Typography, IconButton } from '@mui/material'

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center' })}
`
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  height: 100%;
  color: white;
`

function NewsLetter(props) {
  const [subscriptiondetail, setSubscription] = React.useState({ email: '' })
  const [isSubscribeSuccess, setSubscriptionSuccess] = React.useState(false)
  const [isExistingSubscription, setIsExistingSubscription] =
    React.useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setSubscription({ ...subscriptiondetail, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (subscriptiondetail.email && subscriptiondetail.email !== '') {
      props.action
        .subscribeToNewsletter(subscriptiondetail.email)
        .then((res) => {
          console.log('Result', res)
          if (res.status === 409) {
            setSubscriptionSuccess(false)
            setIsExistingSubscription(true)
            setSubscription({ email: '' })
            setTimeout(() => {
              setIsExistingSubscription(false)
              setSubscriptionSuccess(false)
            }, 5000)
          } else if (res.status === 200) {
            setIsExistingSubscription(false)
            setSubscriptionSuccess(true)
            setSubscription({ email: '' })
            setTimeout(() => {
              setIsExistingSubscription(false)
              setSubscriptionSuccess(false)
            }, 5000)
          }
        })

        .catch((err) => {
          console.log('Subscription Error', err)
        })
    }
  }

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates about offers and favorite services.</Desc>

      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            required
            label='Email Address'
            variant='outlined'
            onChange={handleChange}
            name='email'
            type='email'
            value={subscriptiondetail.email}
            placeholder='Your email'
          />
          <Button type='submit'>
            <IconButton>
              <Send fontSize='large' sx={{ color: 'white', padding: '5px' }} />
            </IconButton>
          </Button>
        </Box>
      </form>
      {isExistingSubscription && (
        <Typography variant='h4'>
          {' '}
          Looks like you are already subscribed. Stay tuned for exciting updates
          !
        </Typography>
      )}
      {isSubscribeSuccess && (
        <Typography variant='h4'>
          {' '}
          You are subscribed for our exciting updates, stay tuned !
        </Typography>
      )}
    </Container>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      status: state.newsletterSuccess,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(newsletterSubscriptionAction, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsLetter)
