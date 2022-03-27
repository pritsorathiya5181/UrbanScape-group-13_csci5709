import React from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Calendar from '../../../components/customer/DateTimePicker/Calendar'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as cartAction from '../../../action/cartAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
  cardAction: {
    display: "flex"
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
  rightAlignItem: {
    marginLeft: "auto"
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

function ServiceCard(props) {
  const classes = useStyles()
  const defaultFormValues = { fName: "", contactNum: null, email: "", address: "", bookingTime: "2017-05-24T10:30", instructions: "" };
  const [bookingFormDetails, setBookingFormDetails] = useState(defaultFormValues);
  const [expanded, setExpanded] = React.useState(false)

  const handleBooking = (e) => {
    const { name, value } = e.target;
    setBookingFormDetails({ ...bookingFormDetails, [name]: value });
  };

const handleSubmit = () => {

  props.action.addCartItem(bookingFormDetails).then((res) => {
    console.log("Result" , res)
   })
   .catch((err) => {
     console.log('Add Cart Item Error', err)
   })
  handleClose();

  }


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
          title={props.services.serviceName}
          subheader={props.services.subheader}
          sx={{ textAlign: 'start' }}
        />
        <CardMedia className={classes.media} image={props.services.img} />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.services.title}
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
          <form >
        <DialogTitle>Book {props.services.serviceName}</DialogTitle>
        <DialogContent dividers>
        
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            value={bookingFormDetails.fName} 
            onChange={handleBooking}
            fullWidth
            name="fName"
            label="Full Name"
            type="fname"
            variant="outlined"
          />
           <TextField
            autoFocus
            margin="dense"
            fullWidth
            id="outlined-basic"
            value={bookingFormDetails.contactNum} 
            onChange={handleBooking}
            name="contactNum"
            label="Contact Number"
            type="contactNum"
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            name="email"
            value={bookingFormDetails.email} 
            onChange={handleBooking}
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            value={bookingFormDetails.address} 
            onChange={handleBooking}
            fullWidth
            name="address"
            label="Address"
            type="address"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            name="instructions"
            value={bookingFormDetails.instructions} 
            onChange={handleBooking}
            fullWidth
            id="outlined-basic"
            multiline
            rows={2}
            label="Special Instructions"
            type="instructions"
            variant="outlined"
          />
          
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button type="submit" align="center" variant="contained">
            <ShoppingCartIcon sx={{ color: 'white', padding: "5px" }} fontSize="small"/>Add To Cart </Button>
        </DialogActions>
        </form>
      </Dialog>
      <div>
      {props.services.price}
      </div>
      
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon className={classes.rightAlignItem} />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{props.services.desc}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </section>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      cartData: state.cart
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(cartAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCard)
