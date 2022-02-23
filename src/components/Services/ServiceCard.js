import React from 'react'
import clsx from 'clsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Calendar from '../DateTimePicker/Calendar'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { red } from '@mui/material/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

function ServiceCard(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <section>
      <Card className={classes.root}>
        <CardHeader
          title={props.services.title}
          subheader={props.services.subheader}
          sx={{ textAlign: 'start' }}
        />
        <CardMedia className={classes.media} image={props.services.img} />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.services.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label='add to cart'>
            <ShoppingCartIcon />
          </IconButton> */}
          <Button variant='text' sx={{ textDecoration: 'underline' }}>
            Book Service
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{props.services.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </section>
  )
}

export default ServiceCard
