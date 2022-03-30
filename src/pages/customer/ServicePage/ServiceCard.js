import React from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { hasToken } from '../../../utils/scale';
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
    margin: '15px'
  },
  media: {
    height: '200px',
    paddingTop: '56.25%',
  },
  cardAction: {
    display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
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
  const [isValidPhoneNum, setIsValidPhoneNum] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  let newDate = new Date()

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  
  let mobError = 'Please enter a valid mobile number.';
  let h = addZero(newDate.getHours());
  let m = addZero(newDate.getMinutes());

   let defaultBookingDate = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + (newDate.getDate() + 1) + 'T' + h + ':' + (m);
   let minBookingDate = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + (newDate.getDate() + 1) + 'T' + h + ':' + (m - 2);
   defaultBookingDate = defaultBookingDate.toString();

  const defaultFormValues = { fName: "", contactNum: undefined, email: "", address: "", bookingTime: defaultBookingDate, instructions: "" };
  const [bookingFormDetails, setBookingFormDetails] = useState(defaultFormValues);
  const [expanded, setExpanded] = React.useState(false)

  const handleBooking = (e) => {
    const { name, value } = e.target;
    setBookingFormDetails({ ...bookingFormDetails, [name]: value });
  };

const validatePhoneNumber = (mobileNum) => {
  let mobRegex = /^\d{10}$/;
  if(mobileNum.match(mobRegex)) {
    setIsValidPhoneNum(true);
      return true;
  } else {
    setIsValidPhoneNum(false);
     return false;
  }
}

const handleSubmit = (event) => {
  event.preventDefault();

  if(!hasToken()) {
    alert('Please login to continue')
    window.location.href = '/userlogin'
  }

  if(validatePhoneNumber(bookingFormDetails.contactNum)) {
  bookingFormDetails.serviceName = props.services.serviceName;
  bookingFormDetails.price = props.services.price;
  bookingFormDetails.serviceCategory = props.serviceCategory;
  props.action.addCartItem(bookingFormDetails).then((res) => {
    setIsAddedToCart(true);
    console.log("Result" , res)
   })
   .catch((err) => {
     console.log('Add Cart Item Error', err)
   })
  handleClose();
  } else {

  }

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
        <Typography align='left' variant='overline' color='textSecondary' gutterBottom component='p'>
          <b>Base price: ${props.services.price}*</b>
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.services.title}
          </Typography>
          
        </CardContent>
        <CardActions className={classes.cardAction} disableSpacing>
          {/* <IconButton aria-label='add to cart'>
            <ShoppingCartIcon />
          </IconButton> */}
          <Button size="small" variant='text' onClick={handleClickOpenDialog} sx={{ textDecoration: 'underline' }}>
            Book Service
          </Button>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book {props.services.serviceName}</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            margin="dense"
            required 
            id="outlined-basic"
            value={bookingFormDetails.fName} 
            onChange={handleBooking}
            fullWidth
            name="fName"
            label="Full Name"
            variant="outlined"
          />
           <TextField
            required 
            margin="dense"
            fullWidth
            id="outlined-basic"
            value={bookingFormDetails.contactNum} 
            onChange={handleBooking}
            name="contactNum"
            label="Contact Number"
            variant="outlined"
          />
          {!isValidPhoneNum && (
       <p  style={{color:'red'}}>{mobError}</p>
      )}
           
          <TextField
            required 
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
            required 
            margin="dense"
            id="outlined-basic"
            value={bookingFormDetails.address} 
            onChange={handleBooking}
            fullWidth
            name="address"
            label="Address"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
                  margin="dense"
                  fullWidth
                  id="datetime-local"
                  name="bookingTime"
                  label="Book appointment"
                  type="datetime-local"
                  InputProps={{inputProps: { min: minBookingDate} }}
                  value={bookingFormDetails.bookingTime}
                  onChange={handleBooking}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

          <TextField
            margin="dense"
            name="instructions"
            value={bookingFormDetails.instructions} 
            onChange={handleBooking}
            fullWidth
            id="outlined-basic"
            multiline
            rows={2}
            label="Special Instructions"
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
      
          <IconButton
            className={clsx(classes.expand,classes.rightAlignItem, {
              [classes.expandOpen]: expanded
            }) } 
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{props.services.desc}</Typography>
            <Typography variant='caption'>* Base price indicates the starting prices for the service, exact amount will be quoted by the service professionals on-site after assessing the required effort.</Typography>
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
