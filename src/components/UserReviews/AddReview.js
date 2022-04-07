import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { TextareaAutosize } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/string'

export default function BasicRating() {
  const [value, setValue] = React.useState(2)
  const navigateHome = useNavigate()
  console.log(value)
  const theme = createTheme()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      firstname: data.get('name'),
      review: data.get('review'),
      ratings: value,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(`${BASE_URL}reviews/addReview`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          navigateHome('/')
        }
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* <Grid
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
      /> */}
        {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Let us know how was your experience!
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
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              type='text'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='review'
              label='Write a review'
              name='review'
              autoComplete='review'
              type='text'
            />
            <Box
              sx={{
                '& > legend': { mt: 2 },
                position: 'absolute',
                left: '50%',
                top: '70%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <Typography component="legend"></Typography> */}
              <Rating
                name='simple-controlled'
                value={value}
                size='large'
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
              />
            </Box>
            <br></br>
            <br></br>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      {/* </Grid> */}
    </ThemeProvider>
  )
}
