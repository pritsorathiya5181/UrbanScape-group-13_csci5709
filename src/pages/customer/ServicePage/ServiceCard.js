import React from 'react'
import clsx from 'clsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Calendar from '../../../components/customer/DateTimePicker/Calendar'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button variant='text' onClick={handleClickOpenDialog} sx={{ textDecoration: 'underline' }}>
            Book Service
          </Button>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book {props.services.title}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            fullWidth
            label="Full Name"
            type="fname"
            variant="outlined"
          />
           <TextField
            autoFocus
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Contact Number"
            type="contactNum"
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            fullWidth
            label="Address"
            type="address"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            id="outlined-basic"
            multiline
            rows={2}
            label="Special Instructions"
            type="email"
            variant="outlined"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color='primary'>Add To Cart</Button>
        </DialogActions>
      </Dialog>
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
