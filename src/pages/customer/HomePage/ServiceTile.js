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
    maxWidth: "inherit",
    minWidth: "inherit"
  },

  media: {
    height: "inherit"
  },
})

function ServiceTile(props) {
  const classes = useStyles()
  let navigate = useNavigate()

  const navigateToServicePage = () => {
    if (props.service.serviceCategory === "Beauty") {
      navigate('./beautyservices')
    } else if (props.service.serviceCategory === "Plumbing") {
      navigate('./plumbingservices')
    } else if (props.service.serviceCategory === "Carpentry") {
      navigate('./carpentryservices')
    }
  }

  return (
    <Card className={classes.root}>
     <div
        style={{
          flex: 1,
          heigth: '140px',
          position: 'relative',
          maxWidth: "inherit",
    minWidth: "inherit"
        }}
      >
      <CardMedia style={{ height: "700px", width: "100%", paddingTop: "2%" }} component="img" image={props.service.categoryImg} title={props.service.serviceCategory}/> 
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'white',
          margin: '80px',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <Typography variant='h4'>{props.service.serviceCategory}</Typography>
          <Typography variant='h6'>{props.service.categoryDesc}</Typography>

         <Button
          size='small'
          variant="contained"
          color='primary'
          onClick={navigateToServicePage}
        >
          Book Now
        </Button>
         </div>
  </div>
    </Card>
  )
}

export default ServiceTile
