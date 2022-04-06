// Author: Aeshna Verma - B00880776

import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Card,
  Box,
  Typography,
  ListItem,
  Avatar,
  ListItemText,
  Divider
} from '@mui/material'


import { connect } from 'react-redux'
import * as cartAction from '../../../action/cartAction'
import * as orderAction from '../../../action/orderAction'
import { hasToken } from '../../../utils/scale'
import CardDetails from './CardDetails';

    const Payment = (props) => {
    
    const navigate = useNavigate()

    const [cartTotal, setCartTotal] = useState(props.cartData.cartTotalAmount || 0)
    const [discount, setDiscount] = useState(props.cartData.cartDiscountAmount || 0)
    const [itemsCount, setItemsCount] = useState(props.cartData.cartDiscountAmount || 0)
    const [payUsingCard, setPayUsingCard] = useState()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [cart, setCart] = useState(props.cartData || {})
    const [cartItems, setCartItems] = useState(props.cartData.cartItems || [])

    
    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
        console.log(" Payment method ", event.target.value)


        if(event.target.value === "card"){
          console.log("if")
          setPayUsingCard(true) 
        }
        else if (event.target.value === "cash"){
          console.log("else")
          setPayUsingCard(false) 
        }
  
        console.log("Pay using card is " , payUsingCard)

        
    }

    function handleSubmit() {
      navigate('.././success')
    }
    

    function getCartItems() {
      const user = 'dan'
      console.log("Payment get Cart details" )
      props.action
        .getCartItems(user)
        .then((res) => {
        setCart(res.cart)
        setCartItems(res.cart.cartItems)
        setCartTotal(res.cart.cartTotalAmount)
        setDiscount(res.cart.cartDiscountAmount)
        setItemsCount(res.cart.cartItems.length)
        })
        .catch((err) => {
        console.log('err', err)
        })
        

      }

      function saveOrder(){
        const user = 'dareynolds'
        console.log("Save Order")
        // console.log(cartItems)
        props.orderaction.saveOrderRequest(user,cart)
        // .then((res) => {
        //   console.log("Save Order " , res)
    
        // })
        // .catch((err) => {
        //   alert(err)
        //    console.log('save Order err', err)
        // })

        handleSubmit()
      }
    
    useEffect(() => {
    
      // if (!hasToken()) {
      //   window.location.href = '/customer/unauthenticated/'
      // }
       getCartItems() 
    
    }, [])
    
 

  return (
    <div>

    
    <Box display = "flex"
    justifyContent="center"
    alignItems = "center"
    padding='30px'> 
    <Typography  variant = "h3" display="block" >Order Summary  </Typography> 
    </Box>

    <Box display = "flex"
    justifyContent="center"
    alignItems = "center"> 
    <Typography  variant = "h5" display="block" > Total amount to Pay:  {cartTotal}  </Typography>
    </Box>

    <Box display = "flex"
    justifyContent="center"
    alignItems = "center"
    paddingBottom='30px'>
    <Typography  variant = "h5" display="block" >  No of Services Booked:  {itemsCount}  </Typography>  
    </Box>
    
    <Box display = "flex"
    justifyContent="center"
    alignItems = "center"
    paddingBottom='30px'>

    <FormControl required sx={{ m: 1, minWidth: 180 }} > 
    <InputLabel id="paymeans"> Payment Method</InputLabel>
    <Select
    id="paymeans"
    value={paymentMethod}
    label="Payment Method"
    onChange={handleChange}
    >

    <MenuItem value={"card"}>Debit/credit Card</MenuItem>
    <MenuItem value={"cash"}>Cash after service</MenuItem>
    </Select>
    
    </FormControl>

    </Box>


    <div>
    { payUsingCard && <div> 
      <Box  display = "flex"
    justifyContent="center"
    alignItems = "center">

        <CardDetails  ></CardDetails>
        </Box>

        <Box  display = "flex"
    justifyContent="center"
    alignItems = "center">
        <Button 
        variant="contained" 
        onClick = {saveOrder}
        >
        Pay
        </Button>
        </Box>
      
      </div> 
    }

    { !payUsingCard && 
      <div>  
           <Box display = "flex"
          justifyContent="center"
           alignItems = "center">   
        <Button variant="contained"
         onClick = {saveOrder}
         >Proceed</Button>
         </Box>
      </div> 
    }
    
    </div>
  
  
    </div>
  )
  
}

function mapStateToProps(state) {
    if (state) {
      return {
        cartData: state.cart,
        orders: state.orders,
      }
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      action: bindActionCreators(cartAction, dispatch),
      orderaction: bindActionCreators(orderAction, dispatch),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Payment)