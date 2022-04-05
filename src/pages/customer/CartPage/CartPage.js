// Author: Aeshna Verma - B00880776

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Button,
  TextField,
  Typography
} from '@mui/material'


import { connect } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as cartAction from '../../../action/cartAction'
import { hasToken } from '../../../utils/scale'



const CartPage = (props) => {


const [cart, setCart] = useState(props.cartData || {})
const [cartItems, setCartItems] = useState(props.cartData.cartItems || [])

function getCartItems() {
  const user = 'dan'
  props.action
    .getCartItems(user)
    .then((res) => {
      setCart(res.cart)
      setCartItems(res.cart.cartItems)

    })
    .catch((err) => {
       console.log('err', err)
    })
  }


useEffect(() => {

  if (!hasToken()) {
    window.location.href = '/customer/unauthenticated/'
  }
   getCartItems() 
}, [])


function  removeFromCart (itemId, itemPrice) {
    console.log("Remove from cart!");
    console.log("Params: " , itemId, itemPrice)
    
    props.action.deleteItem(itemId, itemPrice)
    .then((res) => {
          console.log("Delete Item : ")
          getCartItems()

          })
          .catch((err) => {
            console.log('Delete Item Error:', err)
      
          })
  }

  var isCartEmpty
  const cartItemCount = cartItems.length

  if(cartItemCount > 0){
    isCartEmpty = false;
  }
  else{
   isCartEmpty = true;
  }
 
  const cartTable = () => {
    return (
      <div>
    <TableContainer component={Paper}>
    <Table sx={{ 
      marginLeft: 'auto',
      marginRight: 'auto',
      width: "max-content" ,
      border: "1px solid rgba(0,0,0,0.2)",
      padding: 2
    }} 
      aria-label="spanning table">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={3}>
            Service Details
          </TableCell>
          <TableCell align="right">Booking Details</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Service Category</TableCell>
          <TableCell>Service Name</TableCell>
          <TableCell>Client Name</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Time</TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {cart.cartItems.length} */}
        {cartItems.map((row, idx) => (
          <TableRow key={idx}>  
            <TableCell>{row.serviceCategory}</TableCell>
            <TableCell>{row.serviceName}</TableCell>
            <TableCell>{row.clientName}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell align="right">{row.time}</TableCell>
            <TableCell align="right">{row.servicePrice}</TableCell>
            <TableCell align="right"><Button onClick={() => removeFromCart(row.itemNo, row.servicePrice)}
                                      color = "info"
                                      sx = {{backgroundColor: "#D3DEDC"}}> Remove </Button></TableCell>
          </TableRow>
        ))}

        <TableRow>
          <TableCell rowSpan={3} ></TableCell>
          <TableCell colSpan={2}>Subtotal</TableCell>
          <TableCell align="right">{cart.cartTotalAmount}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Discount</TableCell>
          <TableCell align="right">{cart.cartDiscountAmount}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right">{cart.cartTotalAmount}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>

  </div>
    )
  }

  const checkout = () => {
    return (
    
<div>
  <div  style={{ display: "flex" , justifyContent: "center"}}>
  <TextField id="filled-basic" label="Enter coupon code" variant="filled" / >
  <Button disabled variant="contained"  sx = {{backgroundColor: "#D3DEDC"}}   >
  APPLY
  </Button>
  </div>

  <div style={{ display: "flex" , justifyContent: "center" , padding: 50}}>
  <Button disabled variant="contained"  sx = {{backgroundColor: "#D3DEDC" , p:1}}  >
    CHECKOUT
  </Button>
  </div>
 
</div>
    )
  }
  

  const emptyCart = () => {
    return (
      <Typography variant="h6" textAlign="center" padding = "100px"> Your Cart is Empty! </Typography>
    )
  }

  
  return (
    <div>
    {isCartEmpty        ? 
      <> {emptyCart()}
      </>
    : <> 
      <Typography variant="h3" textAlign="center"> CART </Typography>
      <Typography variant="h6" textAlign="center"> You have ({cartItems.length}) items in your cart</Typography>
      <div >
      {cartTable()}
  `    </div>

    {checkout()}

    </>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)