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


      }
    
    useEffect(() => {
    
      if (!hasToken()) {
        window.location.href = '/customer/unauthenticated/'
      }
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
    <MenuItem value={"cash"}>Cash after service</MenuItem>
    </Select>
    
    </FormControl>
  
    <div>
    { payUsingCard && <div>    
        <CardDetails payUsingCard ></CardDetails>
        <Button 
        variant="contained" 
        onClick = {saveOrder}
        >
        Pay</Button>
      </div> 
    }

    { !payUsingCard && 
      <div>     
        <Button variant="contained">Proceed</Button>
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