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
    margin: '15px'
  },
  media: {
    height: '200px',
    paddingTop: '56.25%', // 16:9
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
  const defaultFormValues = { fName: "", contactNum: undefined, email: "", address: "", bookingTime: "2017-05-24T10:30", instructions: "" };
  const [bookingFormDetails, setBookingFormDetails] = useState(defaultFormValues);
  const [expanded, setExpanded] = React.useState(false)

  const handleBooking = (e) => {
    const { name, value } = e.target;
    setBookingFormDetails({ ...bookingFormDetails, [name]: value });
  };

const handleSubmit = (event) => {
  event.preventDefault();
  bookingFormDetails.serviceName = props.services.serviceName;
  bookingFormDetails.price = props.services.price;
  bookingFormDetails.serviceCategory = props.serviceCategory;
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
            autoFocus
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
            autoFocus
            required 
            margin="dense"
            fullWidth
            id="outlined-basic"
            value={bookingFormDetails.contactNum} 
            onChange={handleBooking}
            name="contactNum"
            label="Contact Number"
            type="number"
            variant="outlined"
          />
          <TextField
            autoFocus
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
            autoFocus
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
                  value={bookingFormDetails.bookingTime}
                  onChange={handleBooking}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
