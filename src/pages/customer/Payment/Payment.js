// Author: Aeshna Verma - B00880776

import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel 
} from '@mui/material'


import { connect } from 'react-redux'
import * as cartAction from '../../../action/cartAction'
import { hasToken } from '../../../utils/scale'
import CardDetails from './CardDetails';

    const Payment = (props) => {
    
    const navigate = useNavigate()

    const [cartTotal, setCartTotal] = useState(props.cartData.cartTotalAmount || 0)
    const [discount, setDiscount] = useState(props.cartData.cartDiscountAmount || 0)
    const [itemsCount, setItemsCount] = useState(props.cartData.cartDiscountAmount || 0)
    const [paymentMethod, setPaymentMethod] = useState('');
    const [payUsingCard, setPayUsingCard] = useState(true)
    

    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
        console.log(event.target.value)
        const payMeans = event.target.value
        if(payMeans === "card"){
          payUsingCard = true
        }
        else if(payMeans === "payafterService"){
          payUsingCard = false
        }
    }



    function getCartItems() {
      const user = 'dan'
      props.action
        .getCartItems(user)
        .then((res) => {
          console.log("Payment Result" , res.cart)
          setCartTotal(res.cart.cartTotalAmount)
          setDiscount(res.cart.cartDiscountAmount)
          setItemsCount(res.cart.cartItems.length)

    
        })
        .catch((err) => {
          alert(err)
           console.log('err', err)
        })

      }
    
    
    useEffect(() => {
    
    //   if (!hasToken()) {
    //     window.location.href = '/customer/unauthenticated/'
    //   }
       getCartItems() 
    
    }, [])
    
 

  return (
    <div>Order Summary 
    <p>Cart Total  Amount {cartTotal}  </p>   
    <p> Discount Applied {discount}  </p>   
    <p> No of Items {itemsCount}  </p>    


    <FormControl required sx={{ m: 1, minWidth: 120 }} > 
    <InputLabel id="paymeans"> Payment Method</InputLabel>
    <Select
    id="paymeans"
    value={paymentMethod}
    label="Payment Method"
    onChange={handleChange}
    >
    <MenuItem value={"card"}>Debit/credit Card</MenuItem>
    <MenuItem value={"payafterService"}>Cash after service</MenuItem>
    </Select>
    </FormControl>
  
     <div>
    <CardDetails payUsingCard ></CardDetails>
    <Button variant="contained">Pay</Button>
    </div>



    </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Payment)