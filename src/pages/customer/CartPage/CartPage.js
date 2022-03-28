import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { v4 as uuidv4 } from 'uuid'
import AddIcon from '@mui/icons-material/Add'
import * as PATH from '../../../utils/string'
import { SERVICE_CATEGORY } from '../../../utils/service'
import useWindowDimensions from '../../../utils/scale'

import { connect } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as cartAction from '../../../action/cartAction'



const CartPage = (props) => {

const navigate = useNavigate()

const [cart, setCart] = useState(props.cartData || {})
const [cartItems, setCartItems] = useState(props.cartData.cartItems || [])

useEffect(() => {
  function getCartItems() {
    const user = 'aes'
    props.action
      .getCartItems(user)
      .then((res) => {
        console.log("Result" , res.cart)
        let itemsList = res.cart.cartItems
        console.log("Items" , itemsList)
        console.log("props" , props)
        setCart(res.cart)
        setCartItems(res.cart.cartItems)

      })
      .catch((err) => {
       // alert(err)
         console.log('err', err)
      })
      console.log("p1", (props))
    }
    getCartItems()
      console.log("Number of items in cart" , props)

}, [])


function  removeFromCart (itemId, itemPrice) {
    console.log("Remove from cart!");
    console.log("Params: " , itemId, itemPrice)
    
    props.action.deleteItem(itemId, itemPrice)
    .then((res) => {
          console.log("Delete Item here: ")
 
          console.log("Result delete item" , res)
          })
          .catch((err) => {
            console.log('ACart Item delete Error', err)
          })
          
        console.log("Delete cart item function")

    const updatedCartItems = cartItems.filter(item => item.itemNo !== itemId)
    setCartItems(updatedCartItems)  
  }

  var isCartEmpty
  const cartItemCount = cartItems.length

  if(cartItemCount > 0){
    isCartEmpty = false;
  }
  else{
   isCartEmpty = true;
  }
 

  
 return (
   <div>
  {isCartEmpty        ? 
    <> <h1> Your cart is empty! </h1> </>
  : <> 
     <Typography variant="h3" textAlign="center"> CART </Typography>
      <Typography variant="h6" textAlign="center"> You have ({cartItems.length}) items in your cart</Typography>
     <div >

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
              Details
            </TableCell>
            <TableCell align="right">Price Details</TableCell>
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
            <TableCell align="right">{cart.cartTaxAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
`    </div>
  </>
       }
       </div>

//     <div>
//       <Typography variant="h3" textAlign="center"> CART </Typography>
//       <Typography variant="h6" textAlign="center"> You have ({cartItems.length}) items in your cart</Typography>
//      <div >

//     <TableContainer component={Paper}>
//       <Table sx={{ 
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         width: "max-content" ,
//         border: "1px solid rgba(0,0,0,0.2)",
//         padding: 2
//       }} 
//         aria-label="spanning table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center" colSpan={3}>
//               Details
//             </TableCell>
//             <TableCell align="right">Price Details</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Service Category</TableCell>
//             <TableCell>Service Name</TableCell>
//             <TableCell>Client Name</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell align="right">Time</TableCell>
//             <TableCell align="right">Price</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* {cart.cartItems.length} */}
//           {cartItems.map((row, idx) => (
//             <TableRow key={idx}>  
//               <TableCell>{row.serviceCategory}</TableCell>
//               <TableCell>{row.serviceName}</TableCell>
//               <TableCell>{row.clientName}</TableCell>
//               <TableCell>{row.date}</TableCell>
//               <TableCell align="right">{row.time}</TableCell>
//               <TableCell align="right">{row.servicePrice}</TableCell>
//               <TableCell align="right"><Button onClick={() => removeFromCart(row.itemNo, row.servicePrice)}
//                                         color = "info"
//                                         sx = {{backgroundColor: "#D3DEDC"}}> Remove </Button></TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell rowSpan={3} ></TableCell>
//             <TableCell colSpan={2}>Subtotal</TableCell>
//             <TableCell align="right">{cart.cartTotalAmount}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={2}>Discount</TableCell>
//             <TableCell align="right">{cart.cartDiscountAmount}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={2}>Total</TableCell>
//             <TableCell align="right">{cart.cartTaxAmount}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
// `    </div>
    
//     </div>

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