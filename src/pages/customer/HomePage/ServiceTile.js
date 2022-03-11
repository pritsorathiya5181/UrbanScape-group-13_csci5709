import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 200,
  },

  media: {
    height: 140,
  },
})

function ServiceTile(props) {
  const classes = useStyles()

  let navigate = useNavigate()

  const navigateToBeautyServices = () => {
    if (props.service.name === 'Book Salon Service') {
      navigate('./beautyservices')
    }
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.service.image} />

        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.service.name}
          </Typography>

          <Typography variant='body2' color='textSecondary' component='p'>
            {props.service.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button
          disabled={props.service.name === 'Book Salon Service' ? false : true}
          size='small'
          color='primary'
          onClick={navigateToBeautyServices}
        >
          View
        </Button>
      </CardActions>
    </Card>
  )
}

export default ServiceTile
